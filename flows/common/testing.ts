var scriptArgs: string[];
var process: any;

export interface Program {
  command: string;
  engine: string;
}

export function getCommand(n): Program | undefined {
  if (
    typeof globalThis.scriptArgs !== "undefined" &&
    Array.isArray(globalThis.scriptArgs)
  ) {
    return {
      command: globalThis.scriptArgs[n],
      engine: "quickjs",
    };
  } else if (
    typeof globalThis.process !== "undefined" &&
    Array.isArray(globalThis.process.argv)
  ) {
    return {
      command: globalThis.process.argv[n + 1],
      engine: "v8 (nodejs/deno etc.)",
    };
  }
}

export function run(n: number, name: string, callback: CallableFunction): void {
  const program = getCommand(n);
  if (program?.command == name) {
    callback();
  }
}
