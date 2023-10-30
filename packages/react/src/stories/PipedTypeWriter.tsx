import { UseGeulPipeOptions, useGeulPipe } from "../hooks/use-geul-pipe";

export type PipedTypeWriterProps = UseGeulPipeOptions & {
  values: string[];
};

export const PipedTypeWriter = ({
  values,
  ...options
}: PipedTypeWriterProps) => {
  const { geul, next, reset } = useGeulPipe(values, options);

  return (
    <div>
      <button onClick={(_) => reset()}>reset</button>
      <button onClick={(_) => next()}>next</button>
      {geul}
    </div>
  );
};
