import { omit, pipe } from "@fxts/core"

export const refineProps = <T extends Record<string, any>>(props: T): T => {
  return pipe(
    props as Record<string, any>,
    omit(["pageResources", "pageContext", "serverData"]),
  ) as T;
} 