import { pipe } from "@fxts/core";
import { phonemesSeperator } from "../utils/phonemes/phonemes.seperator";

export type ThingsProps = { name: string };
export const Things = ({ name }: ThingsProps) => (
  <div>hello {pipe(phonemesSeperator(name), JSON.stringify)}</div>
);
