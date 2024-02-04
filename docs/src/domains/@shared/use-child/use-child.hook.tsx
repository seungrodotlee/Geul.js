import { DependencyList, ReactNode, useCallback } from "react";
import { childrenSelector } from "./use-child.utils";

const useChild = (children: ReactNode, deps?: DependencyList) => {
  const getChild = useCallback(childrenSelector(children), [
    children,
    ...(deps ?? []),
  ]);

  const getChildren = useCallback(
    childrenSelector(children, {
      multiselect: true,
    }),
    [children, ...(deps ?? [])],
  );

  return {
    getChild,
    getChildren,
  };
};

export default useChild;
