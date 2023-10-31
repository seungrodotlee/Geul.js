import { UseGeulPipeOptions, useGeulPipe } from "../hooks/use-geul-pipe";

import { TypingGround } from "./TypingGround";

export type PipedTypeWriterProps = UseGeulPipeOptions & {
  values: string[];
};

export const PipedTypeWriter = ({
  values,
  ...options
}: PipedTypeWriterProps) => {
  const { geul, next, reset } = useGeulPipe(values, options);

  return (
    <TypingGround type="useGeulPipe" geul={geul} onReset={reset} onRun={next} />
  );
};
