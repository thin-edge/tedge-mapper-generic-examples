/*
  Serialize json messages into protobuf
*/
// import * as proto from 'protobufjs';
import { Message, Timestamp, Run } from "../../common/tedge";
import * as messages from "./sensor";

export interface Config {}

export function decodeBase64(data) {
  return Uint8Array.from(atob(data), c => c.charCodeAt(0))
}

export function onMessage(message: Message, config: Config): Message[] {
  const payload = JSON.parse(message.payload);

  const sensor = new messages.sensorpackage.SensorMessage({
    temperature: payload.temperature,
    humidity: payload.humidity,
  });
  
  const out = messages.sensorpackage.SensorMessage.encode(sensor).finish();
  var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(out)));
  return [{
    timestamp: message.timestamp,
    topic: message.topic + "/proto",
    payload: base64String,
  }];
}
