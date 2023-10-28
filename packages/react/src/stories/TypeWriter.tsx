import { useGeul } from "../hooks/use-geul";

export type TypeWriterProps = { initial: string; value: string };

export const TypeWriter = ({ initial, value }: TypeWriterProps) => {
  const { geul, run, reset } = useGeul(value, {
    speed: 50,
    initial,
  });

  return (
    <div>
      <button onClick={(_) => reset()}>reset</button>
      <button onClick={(_) => run()}>run</button>
      {geul}
    </div>
  );
};
