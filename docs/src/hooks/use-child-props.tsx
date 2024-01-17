import { find, isNil, pipe, prop, throwIf } from "@fxts/core";
import {
  DependencyList,
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  useMemo,
} from "react";
import { P, match } from "ts-pattern";

type UseChildPropsProps<Child extends FC> = {
  children: ReactNode;
  type: Child;
};
const useChildProps = <
  Child extends FC | ((...args: any) => JSX.Element),
  T extends ReactElement,
  Props extends Parameters<Child>[0],
>(
  { children, type }: UseChildPropsProps<Child>,
  deps?: DependencyList,
): Props => {
  const props = useMemo(() => {
    return pipe(
      match(children)
        .with(P.array({ type: P._ }), () =>
          pipe(
            children as Iterable<ReactElement>,
            find((child) => child.type === type),
            prop("props"),
          ),
        )
        .with({ type }, (child) => (child as ReactElement).props)
        .otherwise(() => null),
      throwIf(isNil, () => Error(`${type.name} is required!`)),
    );
  }, [children, ...(deps ?? [])]);

  return props;
};

export default useChildProps;
