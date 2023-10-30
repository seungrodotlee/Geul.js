import { UseGeulPipeOptions, useGeulPipe } from "../hooks/use-geul-pipe";

export type PipedTypeWriterProps = UseGeulPipeOptions & {
  values: string[];
  delay: number;
};

export const PipedTypeWriter = ({
  values,
  delay,
  ...options
}: PipedTypeWriterProps) => {
  const { geul, next, reset } = useGeulPipe(values, options);

  return (
    <div>
      <button onClick={(_) => reset()}>reset</button>
      <button onClick={(_) => next(delay)}>next</button>
      {geul}
    </div>
  );
};
