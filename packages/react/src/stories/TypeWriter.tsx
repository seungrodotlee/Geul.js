import { UseGeulOptions, useGeul } from "../hooks/use-geul";

export type TypeWriterProps = UseGeulOptions & { value: string };

export const TypeWriter = ({ value, ...options }: TypeWriterProps) => {
  const { geul, run, reset } = useGeul(value, options);

  return (
    <div>
      <button onClick={(_) => reset()}>reset</button>
      <button onClick={(_) => run()}>run</button>
      {geul}
    </div>
  );
};
