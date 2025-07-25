import { expect, test } from "@jest/globals";
import * as tedge from "../../common/tedge";
import * as flow from "../src/main";

test("Converts string to a timestamp", async () => {
  return flow
    .onMessage(
      {
        timestamp: tedge.mockGetTime(),
        topic: "/plant1/line1/device1_measure1_Type",
        payload: JSON.stringify({
          value: 100,
        }),
      },
      {
        substitutions: [
          {
            pathSource: "value",
            pathTarget: "output",
          },
          {
            pathSource: "'measure1_Type'",
            pathTarget: "type",
          },
          {
            pathSource: "$now()",
            pathTarget: "time",
          },
        ],
      },
    )
    .then((data) => {
      const payload = JSON.parse(data.payload);
      expect(Object.keys(payload)).toHaveLength(3);
      expect(payload).toHaveProperty("output", 100);
      expect(payload).toHaveProperty("type", "measure1_Type");
      expect(payload).toHaveProperty("time");
    });
});
