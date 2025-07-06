import { expect, test, describe } from "@jest/globals";
import * as tedge from "../../common/tedge";
import { UptimeTracker } from "../src/uptime";

jest.useFakeTimers();

describe('UptimeTracker', () => {
  let tracker: UptimeTracker;
  const minute = 60 * 1000;
  const now = new Date('2025-01-01T12:00:00Z').getTime();

  beforeEach(() => {
    jest.setSystemTime(now);
    tracker = new UptimeTracker(10); // 10-minute window
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should return 0% uptime when offline only', () => {
    expect(tracker.getUptimePercentage()).toBe(0);
  });

  test('should return 100% uptime if always online', () => {
    tracker.updateStatus('online', now - 10 * minute);
    expect(tracker.getUptimePercentage()).toBeCloseTo(100, 1);
  });

  test('should correctly calculate uptime percentage', () => {
    tracker.updateStatus('online', now - 9 * minute);
    tracker.updateStatus('offline', now - 5 * minute);
    tracker.updateStatus('online', now - 2 * minute);

    // Online: 9min to 5min = 4min, 2min to now = 2min
    // Total online = 6min / 10min = 60%
    const expectedUptime = (6 * minute) / (10 * minute) * 100;
    expect(tracker.getUptimePercentage()).toBeCloseTo(expectedUptime, 1);
  });

  test('should count interruptions correctly', () => {
    tracker.updateStatus('online', now - 9 * minute);
    tracker.updateStatus('offline', now - 5 * minute);
    tracker.updateStatus('online', now - 2 * minute);
    tracker.updateStatus('offline', now - 1 * minute);
    expect(tracker.getInterruptionCount()).toBe(2);
  });

  test('should discard events outside the window', () => {
    tracker.updateStatus('online', now - 20 * minute);
    tracker.updateStatus('offline', now - 19 * minute);
    tracker.updateStatus('online', now - 2 * minute);

    // Only last 2 minutes online within window
    const expectedUptime = (2 * minute) / (10 * minute) * 100;
    expect(tracker.getUptimePercentage()).toBeCloseTo(expectedUptime, 1);
    expect(tracker.getInterruptionCount()).toBe(0);
  });
});
