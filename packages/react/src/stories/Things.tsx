import { pipe } from "@fxts/core";
import { wordsSeperator } from "../utils/words/words.seperator";

export type ThingsProps = { name: string };
export const Things = ({ name }: ThingsProps) => (
  <div>hello {pipe(wordsSeperator(name), JSON.stringify)}</div>
);
