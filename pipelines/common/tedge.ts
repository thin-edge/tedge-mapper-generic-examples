export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Flow {
  process(timestamp: Timestamp, message: Message, config: any): Message[];
  tick?: (flag: any, config: any) => Message[];
}

export interface Message {
  topic: string;
  payload: string;
  retain?: boolean;
}

export function mockGetTime(): Timestamp {
  const now = Date.now() / 1000;
  const seconds = Math.trunc(now);
  const nanoseconds = (now - seconds) * 10e9;
  return {
    seconds,
    nanoseconds,
  };
}

export function Run(module: Flow, messages: Message[], config: any): Message[] {
  const outputMessages: Message[] = [];
  messages.forEach((message) => {
    const timestamp = mockGetTime();
    const output = module.process(timestamp, message, config);
    outputMessages.push(...output);
    if (output.length > 0) {
      console.log(JSON.stringify(output));
    }
  });

  if (module.tick) {
    const output = module.tick(mockGetTime(), config);
    outputMessages.push(...output);
    console.log(JSON.stringify(output));
  }
  return outputMessages;
}
