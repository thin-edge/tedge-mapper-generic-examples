import { expect, test } from "@jest/globals";
import * as messages from "../src/sensor";

test("Encode and decode sensor data", () => {
  const input = messages.sensorpackage.SensorMessage.create({
    temperature: 10.12,
  });
  const encodedMessage = messages.sensorpackage.SensorMessage.encode(input)
    .finish()
    .toString();
  const decodedMessage = messages.sensorpackage.SensorMessage.decode(
    Buffer.from(encodedMessage, "utf8"),
  );
  expect(decodedMessage.temperature).toBe(10.12);
  expect(decodedMessage.humidity).toBe(0);
});
