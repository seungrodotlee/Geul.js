import {
  UseDynamicGeulOptions,
  useDynamicGeul,
} from "../hooks/use-dynamic-geul";

import { TypingGround } from "./TypingGround";

export type DynamicTypeWriterProps = UseDynamicGeulOptions & {
  initial: string;
  value: string;
};

export const DynamicTypeWriter = ({
  initial,
  value,
  ...options
}: DynamicTypeWriterProps) => {
  const { geul, run, reset } = useDynamicGeul(initial, options);

  return (
    <TypingGround
      type="useDynamicGeul"
      geul={geul}
      onReset={reset}
      onRun={() => run(value)}
    />
  );
};
