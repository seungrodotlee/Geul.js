import { useGeul } from "../hooks/use-geul";

export type ThingsProps = { name: string };
export const Things = ({ name }: ThingsProps) => {
  const { geul, run, reset } = useGeul(name, {
    speed: 50,
  });

  return (
    <div>
      <button onClick={(_) => reset()}>reset</button>
      <button onClick={(_) => run()}>run</button>
      {geul}
    </div>
  );
};
