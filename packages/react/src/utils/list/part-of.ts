import { join, map, pipe } from "@fxts/core";
import { P, match } from "ts-pattern";

export function partOf<T>(list: T[]): (comparisonTarget: T[]) => boolean;
export function partOf<T>(list: T[], comparisonTarget: T[]): boolean;
export function partOf<T>(list: T[], comparisonTarget?: T[]) {
  return match(comparisonTarget)
    .with(
      P.nullish,
      () => (comparisonTarget: T[]) => partOf(list, comparisonTarget),
    )
    .with(
      P.when((target) => typeof target[0] === "object"),
      (target) =>
        pipe(
          list,
          map((item) => JSON.stringify(item)),
          join(""),
        ).includes(
          pipe(
            target as T[],
            map((item) => JSON.stringify(item)),
            join(""),
          ),
        ),
    )
    .otherwise((target) => join("", list).includes(join("", target)));
}
