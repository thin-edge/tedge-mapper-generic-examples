import { expect, test } from "@jest/globals";
import * as tedge from "../../common/tedge";
import * as flow from "../src/main";
import * as messages from "../src/sensor";

test("Converts payload to protobuf", () => {
  const output = flow.onMessage({
    timestamp: tedge.mockGetTime(),
    topic: "example",
    payload: JSON.stringify({
      "temperature": 12.3,
    }),
  }, {});
  
  const rawPayloadBuf = flow.decodeBase64(output[0].payload);
  const decodedMessage = messages.sensorpackage.SensorMessage.decode(rawPayloadBuf);
  expect(decodedMessage.temperature).toBe(12.3);
});
