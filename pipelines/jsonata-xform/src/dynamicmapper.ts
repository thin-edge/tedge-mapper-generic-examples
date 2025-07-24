import { Message } from "../../common/tedge";
import jsonata from "jsonata";
import * as _ from "lodash";
// https://nearform.com/insights/the-jsonata-performance-dilemma/

export interface Substitution {
  pathSource: string;
  pathTarget: string;
  repairStrategy?: string;
  expandArray?: boolean;
}

export interface DynamicMappingRule {
  id?: string;
  identifier?: string;
  name?: string;
  mappingTopic?: string;
  direction?: string;
  mappingTopicSample?: string;
  substitutions: Substitution[];
}

enum Mode {
  IfNotPresent = "if-not-present",
  IfDefined = "if-defined",
  Delete = "delete",
}

export interface PropertyMapping {
  source: string;
  destination: string;
  mode: Mode;
}

function applyModifiers(src: any, dst: any, paths: PropertyMapping[]): any {
  let output = {
    ...src,
  };
  paths.forEach((path) => {
    const value = _.get(src, path.source);
    applyModifier(value, output, path);
  });
  return output;
}

function applyModifier(value: any, output: any, path: PropertyMapping): any {
  if (path.mode == Mode.IfNotPresent) {
    if (!_.has(output, path.destination)) {
      _.set(output, path.destination, value);
    }
  } else if (path.mode == Mode.IfDefined) {
    if (!_.isUndefined(value)) {
      _.set(output, path.destination, value);
    }
  } else if (path.mode == Mode.Delete) {
    _.unset(output, path.source);
  } else {
    _.set(output, path.destination, value);
  }
  return output;
}

export async function build(
  message: Message,
  rule: DynamicMappingRule,
): Promise<any> {
  const input_message = JSON.parse(message.payload);
  const topicSegments = message.topic.split("/");
  const postModifiers: PropertyMapping[] = [];
  const mods = await Promise.all(
    rule.substitutions.map(async (sub) => {
      const pathSource = sub.pathSource.replaceAll(
        "_TOPIC_LEVEL_",
        "$_TOPIC_LEVEL_",
      );
      const expression = jsonata(pathSource);
      const value = await expression.evaluate(input_message, {
        _TOPIC_LEVEL_: topicSegments,
      });

      postModifiers.push({
        source: sub.pathSource,
        destination: sub.pathTarget,
        mode: Mode.Delete,
      });

      // Ignore target path as it should just be deleted
      if (!sub.pathTarget) {
        return {};
      }

      return applyModifier(
        value,
        {},
        {
          destination: sub.pathTarget,
          source: sub.pathSource,
          mode: Mode.IfDefined,
        },
      );
    }),
  );

  let output = {
    ...input_message,
  };

  mods.forEach((item) => {
    output = _.merge(output, item);
  });
  return applyModifiers(output, {}, postModifiers);
}
