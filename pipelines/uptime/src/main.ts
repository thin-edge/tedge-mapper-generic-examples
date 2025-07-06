/*
  Calculate the 
*/
import { Message, Timestamp, Run } from "../../common/tedge";
import { UptimeTracker, Status } from "./uptime";

export class State {
    online_percentage?: number;
    offline_prediction?: number;
};

const state = new UptimeTracker(10);

export interface Config {
  // Enable debug logging
  debug?: boolean;
  window_seconds?: number;
  stats_topic?: string;
}

export function process(
  timestamp: Timestamp,
  message: Message,
  { window_seconds = 86400, debug = false, }: Config = {},
) {
    let status: Status = "online";
    if (message.payload === "0") {
        status = "offline";
    } else if (message.payload === "1") {
        status = "online";
    } else {
        let payload = JSON.parse(message.payload);
        const serviceStatus = payload["status"];
        if (serviceStatus === "up") {
            status = "online";
        } else if (serviceStatus === "down") {
            status = "offline";
        }
    }
    state.updateStatus(status, timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
    return [];
}

export function tick(
  timestamp: Timestamp,
  {
    debug = false,
    window_seconds = 86400,
    stats_topic = "example",
  }: Config = {},
) {
  const online = state.getUptimePercentage();
  const offline = 100 - online;
  const output: Message[] = [{
    topic: `te/device/main///twin/onlineTracker`,
    payload: JSON.stringify({
      online,
      offline,
    }),
  }];
  return output;
}
