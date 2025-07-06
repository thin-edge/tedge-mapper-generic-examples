export type Status = "online" | "offline";

interface StatusChange {
  timestamp: number;
  status: Status;
}

export class UptimeTracker {
  private history: StatusChange[] = [];
  private windowSizeMs: number;

  constructor(windowSizeMinutes: number) {
    this.windowSizeMs = windowSizeMinutes * 60 * 1000;
  }

  updateStatus(status: Status, timestamp: number) {
    const last = this.history[this.history.length - 1];
    if (!last || last.status !== status) {
      this.history.push({ status, timestamp });
    }
  }

  getUptimePercentage(currentTime: number = Date.now()): number {
    const startTime = currentTime - this.windowSizeMs;
    const relevantHistory = this.getWindowedHistory(startTime, currentTime);

    if (relevantHistory.length === 0) return 0;

    let totalOnline = 0;

    for (let i = 0; i < relevantHistory.length - 1; i++) {
      const curr = relevantHistory[i];
      const next = relevantHistory[i + 1];
      if (curr.status === "online") {
        totalOnline += next.timestamp - curr.timestamp;
      }
    }

    // Handle case where device is still online until now
    const last = relevantHistory[relevantHistory.length - 1];
    if (last && last.status === "online") {
      totalOnline += currentTime - last.timestamp;
    }

    return Math.min(100, (totalOnline / this.windowSizeMs) * 100);
  }

  getInterruptionCount(currentTime: number = Date.now()): number {
    const startTime = currentTime - this.windowSizeMs;
    const relevantHistory = this.getWindowedHistory(startTime, currentTime);

    let count = 0;
    for (let i = 1; i < relevantHistory.length; i++) {
      if (
        relevantHistory[i - 1].status === "online" &&
        relevantHistory[i].status === "offline"
      ) {
        count++;
      }
    }

    return count;
  }

  private getWindowedHistory(
    startTime: number,
    endTime: number,
  ): StatusChange[] {
    const history: StatusChange[] = [];
    let i = this.history.findIndex((e) => e.timestamp >= startTime);

    if (i === -1) i = this.history.length;

    // Add the last known status before the window if needed
    if (i > 0 && this.history[i - 1].timestamp < startTime) {
      history.push({
        status: this.history[i - 1].status,
        timestamp: startTime,
      });
    } else if (
      i === 0 &&
      this.history.length > 0 &&
      this.history[0].timestamp > startTime
    ) {
      // Add default offline status if no prior status exists
      history.push({ status: "offline", timestamp: startTime });
    }

    // Add all entries inside the window
    for (
      ;
      i < this.history.length && this.history[i].timestamp <= endTime;
      i++
    ) {
      history.push(this.history[i]);
    }

    return history;
  }
}
