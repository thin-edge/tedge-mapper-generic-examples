import { expect, test, describe } from "@jest/globals";
import * as tedge from "../../common/tedge";
import { UptimeTracker } from "../src/uptime";

jest.useFakeTimers();

describe("UptimeTracker", () => {
  let tracker: UptimeTracker;
  const minute = 60 * 1000;
  const now = new Date("2025-01-01T12:00:00Z").getTime();

  beforeEach(() => {
    jest.setSystemTime(now);
    tracker = new UptimeTracker(10); // 10-minute window
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should return 0% uptime when offline only", () => {
    const result = tracker.getUptimePercentage();
    expect(result.percentage).toBe(0);
    expect(result.durationMs).toBe(0);
  });

  test("should return 100% uptime if always online", () => {
    tracker.updateStatus("online", now - 10 * minute);
    const result = tracker.getUptimePercentage();
    expect(result.percentage).toBeCloseTo(100, 1);
    expect(result.durationMs).toBeCloseTo(10 * minute, 1);
  });

  test("should correctly calculate uptime percentage", () => {
    tracker.updateStatus("online", now - 9 * minute);
    tracker.updateStatus("offline", now - 5 * minute);
    tracker.updateStatus("online", now - 2 * minute);

    // Online: 9min to 5min = 4min, 2min to now = 2min
    // Observed duration: 9min to now = 9min
    // Total online = 6min / 9min = 66.67%
    const expectedUptime = ((6 * minute) / (9 * minute)) * 100;
    const result = tracker.getUptimePercentage();
    expect(result.percentage).toBeCloseTo(expectedUptime, 1);
    // Duration is from first event in window (now - 9min) to now = 9min
    expect(result.durationMs).toBeCloseTo(9 * minute, 1);
  });

  test("should count interruptions correctly", () => {
    tracker.updateStatus("online", now - 9 * minute);
    tracker.updateStatus("offline", now - 5 * minute);
    tracker.updateStatus("online", now - 2 * minute);
    tracker.updateStatus("offline", now - 1 * minute);
    expect(tracker.getInterruptionCount()).toBe(2);
  });

  test("should discard events outside the window", () => {
    tracker.updateStatus("online", now - 20 * minute);
    tracker.updateStatus("offline", now - 19 * minute);
    tracker.updateStatus("online", now - 2 * minute);

    // Only last 2 minutes online within window
    // Observed duration: 2min to now = 2min
    // Uptime: 2min / 2min = 100%
    const expectedUptime = 100;
    const result = tracker.getUptimePercentage();
    expect(result.percentage).toBeCloseTo(expectedUptime, 1);
    // Duration is from first event in window (now - 2min) to now = 2min
    expect(result.durationMs).toBeCloseTo(2 * minute, 1);
    expect(tracker.getInterruptionCount()).toBe(0);
  });
});
