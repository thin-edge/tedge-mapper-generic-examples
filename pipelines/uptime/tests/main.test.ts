import { expect, test, describe, beforeEach } from "@jest/globals";
import * as tedge from "../../common/tedge";
import * as flow from "../src/main";

jest.useFakeTimers();

test("Converts string to a timestamp", () => {
  const output = flow.process(tedge.mockGetTime(), {
    topic: "example",
    payload: "1",
  });
  expect(output).toHaveLength(0);
});

describe("process", () => {
  beforeEach(() => {
    // Reset the internal state of the UptimeTracker in main.ts
    // This is a bit hacky, ideally UptimeTracker would be injected or resettable
    // For testing purposes, we can re-initialize it if it's a global instance
    jest.resetModules();
  });

  describe("process", () => {
    const now = new Date("2025-01-01T12:00:00Z").getTime();
    let flow: typeof import("../src/main");

    beforeEach(() => {
      jest.resetModules();
      flow = require("../src/main");
    });

    test('should update status to online when payload is "1"', () => {
      const timestamp = tedge.mockGetTime(now);
      const message = { topic: "test", payload: "1" };
      flow.process(timestamp, message);
      const output = flow.tick(timestamp, { window_size_minutes: 600 });
      const twinMessage = output.find((msg) =>
        msg.topic.includes("twin/onlineTracker"),
      );
      expect(twinMessage).toBeDefined();
      if (twinMessage) {
        const payload = JSON.parse(twinMessage.payload);
        expect(payload.online).toBeCloseTo(100, 1);
      }
    });
  });

  test('should update status to offline when payload is "0"', () => {
    const timestamp = tedge.mockGetTime();
    const message = { topic: "test", payload: "0" };
    flow.process(timestamp, message);
    const output = flow.tick(timestamp, { window_size_minutes: 600 });
    const twinMessage = output.find((msg) =>
      msg.topic.includes("twin/onlineTracker"),
    );
    expect(twinMessage).toBeDefined();
    if (twinMessage) {
      const payload = JSON.parse(twinMessage.payload);
      expect(payload.offline).toBeCloseTo(100, 1);
    }
  });
});

describe("tick", () => {
  beforeEach(() => {
    // Reset the internal state of the UptimeTracker in main.ts
    // This is a bit hacky, ideally UptimeTracker would be injected or resettable
    // For testing purposes, we can re-initialize it if it's a global instance
    jest.resetModules();
  });

  test("Tick should not crash if the config is set to null", () => {
    const timestamp = tedge.mockGetTime();
    const output = flow.tick(timestamp, null);
    expect(output).toHaveLength(1);
  });
});

describe("UptimeTracker advanced features", () => {
  const { UptimeTracker } = require("../src/uptime");

  test("should not be indeterminate by default", () => {
    const tracker = new UptimeTracker(10);
    expect(tracker.isUninitialized()).toBe(true); // No history, so indeterminate
  });

  test("should be indeterminate when reset to 'uninitialized'", () => {
    const tracker = new UptimeTracker(10);
    tracker.reset(10, "uninitialized");
    expect(tracker.isUninitialized()).toBe(true);
  });

  test("should not be indeterminate after setting to online", () => {
    const tracker = new UptimeTracker(10);
    tracker.reset(10, "online");
    expect(tracker.isUninitialized()).toBe(false);
  });

  test("should be indeterminate if history is empty", () => {
    const tracker = new UptimeTracker(10);
    tracker["history"] = [];
    expect(tracker.isUninitialized()).toBe(true);
  });

  test("reset should update window size and initial state", () => {
    const tracker = new UptimeTracker(1);
    tracker.reset(5, "offline", 1234567890);
    expect(tracker["windowSizeMs"]).toBe(5 * 60 * 1000);
    expect(tracker["history"][0]).toEqual({ status: "offline", timestamp: 1234567890 });
  });
});

describe("UptimeTracker process payload variants", () => {
  let flow: typeof import("../src/main");
  const now = new Date("2025-01-01T12:00:00Z").getTime();
  beforeEach(() => {
    jest.resetModules();
    flow = require("../src/main");
  });

  test('payload "1" sets status to online', () => {
    const timestamp = { seconds: Math.floor(now / 1000), nanoseconds: (now % 1000) * 1e6 };
    const message = { topic: "test", payload: "1" };
    flow.process(timestamp, message, null);
    const output = flow.tick(timestamp, null);
    const twinMessage = output.find((msg) => msg.topic.includes("twin/onlineTracker"));
    expect(twinMessage).toBeDefined();
    if (twinMessage) {
      const payload = JSON.parse(twinMessage.payload);
      expect(payload.online).toBeCloseTo(100, 1);
    }
  });

  test('payload "0" sets status to offline', () => {
    const timestamp = { seconds: Math.floor(now / 1000), nanoseconds: (now % 1000) * 1e6 };
    const message = { topic: "test", payload: "0" };
    flow.process(timestamp, message, null);
    const output = flow.tick(timestamp, null);
    const twinMessage = output.find((msg) => msg.topic.includes("twin/onlineTracker"));
    expect(twinMessage).toBeDefined();
    if (twinMessage) {
      const payload = JSON.parse(twinMessage.payload);
      expect(payload.offline).toBeCloseTo(100, 1);
    }
  });

  test('payload {"status": "up"} sets status to online', () => {
    const timestamp = { seconds: Math.floor(now / 1000), nanoseconds: (now % 1000) * 1e6 };
    const message = { topic: "test", payload: JSON.stringify({ status: "up" }) };
    flow.process(timestamp, message, null);
    const output = flow.tick(timestamp, null);
    const twinMessage = output.find((msg) => msg.topic.includes("twin/onlineTracker"));
    expect(twinMessage).toBeDefined();
    if (twinMessage) {
      const payload = JSON.parse(twinMessage.payload);
      expect(payload.online).toBeCloseTo(100, 1);
    }
  });

  test('payload {"status": "down"} sets status to offline', () => {
    const timestamp = { seconds: Math.floor(now / 1000), nanoseconds: (now % 1000) * 1e6 };
    const message = { topic: "test", payload: JSON.stringify({ status: "down" }) };
    flow.process(timestamp, message, null);
    const output = flow.tick(timestamp, null);
    const twinMessage = output.find((msg) => msg.topic.includes("twin/onlineTracker"));
    expect(twinMessage).toBeDefined();
    if (twinMessage) {
      const payload = JSON.parse(twinMessage.payload);
      expect(payload.offline).toBeCloseTo(100, 1);
    }
  });

  test('payload {"status": "unknown"} does not throw and sets status', () => {
    const timestamp = { seconds: Math.floor(now / 1000), nanoseconds: (now % 1000) * 1e6 };
    const message = { topic: "test", payload: JSON.stringify({ status: "unknown" }) };
    expect(() => flow.process(timestamp, message, null)).not.toThrow();
    const output = flow.tick(timestamp, null);
    const twinMessage = output.find((msg) => msg.topic.includes("twin/onlineTracker"));
    expect(twinMessage).toBeDefined();
  });
});
