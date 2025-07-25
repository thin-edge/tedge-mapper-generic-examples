import { expect, test, describe } from "@jest/globals";
import * as journald from "../src/journald";

describe.each([
  [
    "2025-05-05T21:20:24.485390214Z  INFO Runtime: Started",
    "INFO Runtime: Started",
  ],
  [
    "1751468087: Client monit-1751024993 disconnected : additional info.",
    "Client monit-1751024993 disconnected : additional info.",
  ],
])(".stripTimestampPrefix(%s)", (message: string, expected: string) => {
  test("Strips leading timestamp", () => {
    expect(journald.stripTimestampPrefix(message)).toBe(expected);
  });
});

describe.each([
  ["1751468051367349", 1751468051.367349],
  ["-", undefined],
])(".parseTimestamp(%s)", (timestamp: string, expected?: number) => {
  test("Converts string to a timestamp", () => {
    expect(journald.parseTimestamp(timestamp)).toBe(expected);
  });
});
