import {
  entries,
  flatMap,
  join,
  map,
  pipe,
  prop,
  range,
  reduce,
  toArray,
} from "@fxts/core";
import { P, match } from "ts-pattern";

import { phonemes } from "../../constraints/phonemes";

export const phonemesMerger = (inputedPhonemes: string[]) => {
  return pipe(
    inputedPhonemes,
    entries,
    map(([idx, phoneme]) => [+idx, phoneme] as unknown as [number, string]),
    flatMap(([idx, phoneme]) =>
      match(
        pipe(
          range(3),
          map((adjust) => inputedPhonemes[idx + adjust] || ""),
          map((p) => p.charCodeAt(0)),
          toArray,
        ),
      )
        .with([P.not(P.number.between(12623, 12643)), ...P.array()], () => [
          phoneme,
        ])
        .with([P._, P.not(P.number.between(12593, 12622)), P._], () => [
          phoneme,
          "",
        ])
        .with(
          [P._, P.number.between(12593, 12622), P.number.between(12623, 12643)],
          () => [phoneme, ""],
        )
        .otherwise(() => [phoneme]),
    ),
    toArray,
    entries,
    map(([idx, phoneme]) => [+idx, phoneme] as unknown as [number, string]),
    toArray,
    (paddedPhonemesEntries) =>
      reduce(
        (mem, [idx, paddedPheoneme]) => {
          if (mem.skip > 0) {
            return {
              ...mem,
              skip: mem.skip - 1,
            };
          }

          return match(
            pipe(
              range(3),
              map((adjust) =>
                (
                  (paddedPhonemesEntries[idx + adjust] || [])[1] || ""
                ).charCodeAt(0),
              ),
              toArray,
            ),
          )
            .with(
              [
                P.number.between(12593, 12622),
                P.number.between(12623, 12643),
                P._,
              ],
              (charCodes) => ({
                skip: 2,
                result: [
                  ...mem.result,
                  pipe(
                    charCodes,
                    map((charCode) =>
                      Number.isNaN(charCode)
                        ? ""
                        : String.fromCharCode(charCode),
                    ),
                    toArray,
                    ([initial, middle, final]) => {
                      return String.fromCharCode(
                        44032 +
                          phonemes.initial.indexOf(initial) * 588 +
                          (middle.charCodeAt(0) - 12623) * 28 +
                          phonemes.final.indexOf(final),
                      );
                    },
                  ),
                ],
              }),
            )
            .otherwise(() => ({
              skip: 0,
              result: [...mem.result, paddedPheoneme],
            }));
        },
        { skip: 0, result: [] } as { skip: number; result: string[] },
        paddedPhonemesEntries,
      ),
    prop("result"),
    join(""),
  );
};
