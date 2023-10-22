import { wordsMerger } from "./words.merger";
describe("wordsMerger", () => {
  it("should merge korean phonemes to words", () => {
    expect(
      wordsMerger([
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
      ])
    ).toBe("안녕하세요");
  });

  it("should return inputed phonemes if it can't merged", () => {
    expect(wordsMerger(["ㅇ", "ㅏ", "ㄴ", "ㄴ", "ㅕ", "ㅇ", "ㅎ"])).toBe(
      "안녕ㅎ"
    );
  });

  it("should return inputed phonemes if it's not korean", () => {
    expect(
      wordsMerger([
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
      ])
    ).toBe("안녕 david");
  });
});
