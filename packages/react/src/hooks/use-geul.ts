import { useMemo, useState } from "react";

import { interval, map, take } from "rxjs";
import { pipe, slice, toArray } from "@fxts/core";
import { P, match } from "ts-pattern";

import { phonemesMerger } from "../utils/phonemes/phonemes.merger";
import { phonemesSeperator } from "../utils/phonemes/phonemes.seperator";
import { partOf } from "../utils/list/part-of";

export type UseGeulOptions = {
  speed: number;
  initial?: string;
};
export const useGeul = (
  value: string,
  { speed, initial = "" }: UseGeulOptions,
) => {
  const phonemes = useMemo(() => phonemesSeperator(value), [value]);
  const [geul, setGeul] = useState<string>(initial);
  const [isFired, setFired] = useState<boolean>(false);

  const reset = () => {
    setFired(false);
    setGeul(initial);
  };

  const run = () => {
    match(isFired)
      .with(true, () =>
        console.warn(
          `
            geul(${value}) is already excuted.
            If you want to re-run it. call 'reset' method first.
          `
            .replace(/^ +/gm, "")
            .trim(),
        ),
      )
      .otherwise(() => {
        match(phonemesSeperator(initial))
          .with(P.when(partOf(phonemesSeperator(value))), (initPhonemes) => {
            setFired(true);
            interval(speed)
              .pipe(
                map((idx) =>
                  pipe(phonemes, slice(0, initPhonemes.length + idx), toArray),
                ),
                take(phonemes.length - initPhonemes.length + 1),
              )
              .subscribe((value) => setGeul(phonemesMerger(value)));
          })
          .otherwise(() => {
            throw Error(`Initial value '${initial}' is not part of '${value}'`);
          });
      });
  };

  return { geul, reset, run };
};
