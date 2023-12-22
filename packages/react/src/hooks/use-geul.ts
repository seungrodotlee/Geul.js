import { useCallback, useEffect, useMemo, useState } from "react";

import { finalize, interval, map, take } from "rxjs";
import { join, pipe, slice, sort, toArray } from "@fxts/core";
import { P, match } from "ts-pattern";

import { phonemesMerger } from "../utils/phonemes/phonemes.merger";
import { phonemesDecomposer } from "../utils/phonemes/phonemes.decomposer";
import { partOf } from "../utils/list/part-of";

export type UseGeulOptions = {
  speed: number;
  initial?: string;
  decomposeOnBackspace?: boolean;
};
export const useGeul = (
  value: string,
  { speed = 50, initial = "", decomposeOnBackspace }: UseGeulOptions,
) => {
  const phonemes = useMemo(() => phonemesDecomposer(value), [value]);
  const [geul, setGeul] = useState<string>(initial);
  const [isFired, setFired] = useState<boolean>(false);
  const [isRunning, setRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!isFired) setGeul(initial);
  }, [isFired, initial]);

  const reset = () => {
    setFired(false);
    setGeul(initial);
  };

  const typeForward = useCallback(
    (from: string[], to: string[], onTypeEnd?: () => void) => {
      setFired(true);

      interval(speed)
        .pipe(
          map((idx) => pipe(to, slice(0, from.length + idx), toArray)),
          take(to.length - from.length + 1),
          finalize(() => onTypeEnd && onTypeEnd()),
        )
        .subscribe((value) => setGeul(phonemesMerger(value)));
    },
    [speed],
  );

  const typeDecomposedBackword = useCallback(
    (from: string[], to: string[], onTypeEnd?: () => void) => {
      setFired(true);

      interval(speed)
        .pipe(
          map((idx) => pipe(from, slice(0, from.length - idx), toArray)),
          take(from.length - to.length + 1),
          finalize(() => onTypeEnd && onTypeEnd()),
        )
        .subscribe((value) => setGeul(phonemesMerger(value)));
    },
    [speed],
  );

  const typeBackword = useCallback(
    (from: string, to: string, onTypeEnd?: () => void) => {
      interval(speed)
        .pipe(
          map((idx) => slice(0, from.length - idx, from.split(""))),
          take(from.length - to.length + 1),
          finalize(() => onTypeEnd && onTypeEnd()),
        )
        .subscribe((value) => setGeul(join("", value)));
    },
    [speed],
  );

  const handleTypeEnd = useCallback(
    (onTypeEnd?: () => void) => () => {
      setRunning(false);
      onTypeEnd && onTypeEnd();
    },
    [],
  );

  const run = useCallback(
    (onTypeEnd?: () => void) => {
      setRunning(true);

      match({
        isFired,
        initialPhonemes: phonemesDecomposer(initial),
        decomposeOnBackspace,
      })
        .with({ isFired: true }, () =>
          console.warn(
            `
            geul(${value}) is already excuted.
            If you want to re-run it. call 'reset' method first.
          `
              .replace(/^ +/gm, "")
              .trim(),
          ),
        )
        .with(
          {
            initialPhonemes: P.when(partOf(phonemes)),
          },
          ({ initialPhonemes }) =>
            typeForward(initialPhonemes, phonemes, handleTypeEnd(onTypeEnd)),
        )
        .with(
          {
            initialPhonemes: P.when((init) => partOf(init, phonemes)),
            decomposeOnBackspace: true,
          },
          ({ initialPhonemes }) =>
            typeDecomposedBackword(
              initialPhonemes,
              phonemes,
              handleTypeEnd(onTypeEnd),
            ),
        )
        .with(
          {
            initialPhonemes: P.when((init) => partOf(init, phonemes)),
            decomposeOnBackspace: P.union(P.nullish, false),
          },
          () => typeBackword(initial, value, handleTypeEnd(onTypeEnd)),
        )
        .otherwise(() =>
          pipe(
            [initial, value],
            sort((a, b) => a.length - b.length),
            ([a, b]) => {
              throw Error(`'${a}' is not part of '${b}'`);
            },
          ),
        );
    },
    [
      isFired,
      initial,
      decomposeOnBackspace,
      phonemes,
      value,
      typeForward,
      typeDecomposedBackword,
      typeBackword,
      handleTypeEnd,
    ],
  );

  return { geul, isRunning, reset, run };
};
