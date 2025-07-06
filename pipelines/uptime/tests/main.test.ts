import { expect, test, describe, beforeEach } from "@jest/globals";
import * as tedge from "../../common/tedge";
import * as flow from "../src/main";

jest.useFakeTimers();

test("Converts string to a timestamp", () => {
    const output = flow.process(tedge.mockGetTime(), {
      topic: "example",
      payload: "1",
    })
    expect(output).toHaveLength(0)
});

describe('process', () => {
    beforeEach(() => {
        // Reset the internal state of the UptimeTracker in main.ts
        // This is a bit hacky, ideally UptimeTracker would be injected or resettable
        // For testing purposes, we can re-initialize it if it's a global instance
        jest.resetModules();
    });

    describe('process', () => {
      const now = new Date('2025-01-01T12:00:00Z').getTime();
      let flow: typeof import("../src/main");

      beforeEach(() => {
        jest.resetModules();
        flow = require("../src/main");
      });

      test('should update status to online when payload is "1"', () => {
        const timestamp = tedge.mockGetTime(now);
        const message = { topic: "test", payload: "1" };
        flow.process(timestamp, message);
        const output = flow.tick(timestamp, { window_seconds: 600 });
        const twinMessage = output.find(msg => msg.topic.includes('twin/onlineTracker'));
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
        const output = flow.tick(timestamp, { window_seconds: 600 });
        const twinMessage = output.find(msg => msg.topic.includes('twin/onlineTracker'));
        expect(twinMessage).toBeDefined();
        if (twinMessage) {
            const payload = JSON.parse(twinMessage.payload);
            expect(payload.offline).toBeCloseTo(100, 1);
        }
    });

});
