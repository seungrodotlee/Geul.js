import { reduce } from "@fxts/core";
import { Context, FC, ForwardRefExoticComponent, forwardRef, useContext, useMemo } from "react";

const createContextedComponent = <
  ElementType extends HTMLElement,
  ContextData extends Record<string, any>,
  Comp extends FC | ForwardRefExoticComponent<any>,
  Params = Parameters<Comp>[0],
>(
  name: string,
  Component: FC,
  contextOptions?: {
    Context: Context<ContextData>;
    propPairs: [keyof Params, keyof ContextData][];
  },
) => {
  const Cloned = forwardRef<ElementType, Params>(
    contextOptions
      ? (props) => {
          const data = useContext(contextOptions.Context);

          const contextedProps = useMemo(() => {
            return reduce(
              (result, [originProp, contextProp]) => ({
                ...result,
                [originProp]: data[contextProp],
              }),
              {},
              contextOptions.propPairs,
            );
          }, [data]);

          return (
            <Component
              {...{
                ...props,
                ...contextedProps,
              }}
            />
          );
        }
      : (props) => <Component {...(props as any)} />,
  );

  Cloned.displayName = name;

  return Cloned;
};

export default createContextedComponent;
