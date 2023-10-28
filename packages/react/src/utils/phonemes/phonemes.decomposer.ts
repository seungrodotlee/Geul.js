import {
  entries,
  filter,
  flatMap,
  map,
  pipe,
  split,
  toArray,
} from "@fxts/core";
import { P, match } from "ts-pattern";

import { phonemes } from "../../constraints/phonemes";

export const phonemesDecomposer = (words: string) => {
  return pipe(
    words,
    split(""),
    flatMap((word) =>
      match(word)
        .with(P.string.regex(/[가-힣]/), () =>
          pipe(word.charCodeAt(0) - 44032, (unicode) =>
            pipe(
              Math.floor(unicode / 588),
              (initial) => ({
                initial,
                middle: Math.floor((unicode - initial * 588) / 28),
                final: Math.floor(unicode % 28),
              }),
              (phonemesIdxes) =>
                pipe(
                  phonemesIdxes,
                  entries,
                  map(([type, idx]) => phonemes[type][idx]),
                ),
            ),
          ),
        )
        .otherwise(() => [word]),
    ),
    filter((phonemes) => phonemes !== ""),
    toArray,
  );
};
