import { UseGeulOptions, useGeul } from "../hooks/use-geul";

import { TypingGround } from "./TypingGround";

export type TypeWriterProps = UseGeulOptions & { value: string };

export const TypeWriter = ({ value, ...options }: TypeWriterProps) => {
  const { geul, run, reset } = useGeul(value, options);

  return (
    <TypingGround type="useGeul" geul={geul} onReset={reset} onRun={run} />
  );
};
