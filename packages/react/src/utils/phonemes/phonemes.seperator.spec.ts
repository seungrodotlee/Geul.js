import { phonemesSeperator } from "./phonemes.seperator";
describe("phonemesSeperator", () => {
  it("should seperate korean words to it's phonemes", () => {
    expect(phonemesSeperator("안녕하세요")).toStrictEqual([
      "ㅇ",
      "ㅏ",
      "ㄴ",
      "ㄴ",
      "ㅕ",
      "ㅇ",
      "ㅎ",
      "ㅏ",
      "ㅅ",
      "ㅔ",
      "ㅇ",
      "ㅛ",
    ]);
  });

  it("should return inputed word if it's not korean", () => {
    expect(phonemesSeperator("안녕 david")).toStrictEqual([
      "ㅇ",
      "ㅏ",
      "ㄴ",
      "ㄴ",
      "ㅕ",
      "ㅇ",
      " ",
      "d",
      "a",
      "v",
      "i",
      "d",
    ]);
  });
});
