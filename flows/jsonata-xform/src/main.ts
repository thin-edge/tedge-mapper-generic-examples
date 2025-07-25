/*
  Calculate the total of the input values
*/
import { Message } from "../../common/tedge";
import { build, Substitution, DynamicMappingRule } from "./dynamicmapper";

export interface Config {
  substitutions?: Substitution[];
}

export async function onMessage(message: Message, config: Config = {}) {
  const rule: DynamicMappingRule = {
    substitutions: config.substitutions || [],
  };
  const output = await build(message, rule);
  return {
    topic: `${message.topic}/sum`,
    payload: JSON.stringify(output),
  };
}
