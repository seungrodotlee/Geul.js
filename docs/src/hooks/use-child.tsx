import { find, pipe } from "@fxts/core";
import {
  DependencyList,
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  useMemo,
} from "react";
import { P, match } from "ts-pattern";

type UseChildProps<Child extends FC, Props> = {
  children: ReactNode;
  type: Child;
  overwriteProps?: Props;
};
const useChild = <
  Child extends FC,
  Props extends Parameters<Child>[0],
>(
  { children, type, overwriteProps }: UseChildProps<Child, Props>,
  deps: DependencyList,
) => {
  const child = useMemo(() => {
    return match(children)
      .with(P.array({ type: P._ }), () =>
        pipe(
          children as Iterable<ReactElement>,
          find((child) => child.type === type),
          (child) =>
            child &&
            (overwriteProps
              ? cloneElement(child, { ...child?.props, ...overwriteProps })
              : child),
        ),
      )
      .with({ type }, (child) => child as ReactElement)
      .otherwise(() => undefined);
  }, [children, overwriteProps, ...deps]);

  return child;
};

export default useChild;
