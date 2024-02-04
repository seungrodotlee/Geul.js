import {
  Componentable,
  DependencyList,
  FC,
  ForwardRefExoticComponent,
  ReactNode,
  useCallback,
} from "react";
import { childrenSelector } from "./use-child.utils";
import { map, pipe, prop, tap, toArray } from "@fxts/core";

const useChildProps = (children: ReactNode, deps?: DependencyList) => {
  const getChildProps = useCallback(
    (type: Componentable) => {
      if (!children) return undefined;

      return pipe(
        type,
        childrenSelector(children),
        prop("props"),
      );
    },
    [children, ...(deps ?? [])],
  );

  const getChildrenProps = useCallback(
    (type: Componentable) => {
      return pipe(
        type,
        childrenSelector(children, {
          multiselect: true,
        }),
        map((child) => child.props),
        toArray,
      );
    },
    [children, ...(deps ?? [])],
  );

  return {
    getChildProps,
    getChildrenProps,
  };
};

export default useChildProps;
