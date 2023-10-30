import {
  UseDynamicGeulOptions,
  useDynamicGeul,
} from "../hooks/use-dynamic-geul";

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
    <div>
      <button onClick={(_) => reset()}>reset</button>
      <button onClick={(_) => run(value)}>run</button>
      {/* <div>{geul}</div> */}
      <div dangerouslySetInnerHTML={{ __html: geul }}></div>
    </div>
  );
};
