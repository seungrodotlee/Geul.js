import { phonemesMerger } from "./phonemes.merger";
describe("phonemesMerger", () => {
  it("should merge korean phonemes to words", () => {
    expect(
      phonemesMerger([
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
      ]),
    ).toBe("안녕하세요");
  });

  it("should return inputed phonemes if it can't merged", () => {
    expect(phonemesMerger(["ㅇ", "ㅏ", "ㄴ", "ㄴ", "ㅕ", "ㅇ", "ㅎ"])).toBe(
      "안녕ㅎ",
    );
  });

  it("should return inputed phonemes if it's not korean", () => {
    expect(
      phonemesMerger(["ㅎ", "ㅏ", "ㅇ", "ㅣ", " ", "d", "a", "v", "i", "d"]),
    ).toBe("하이 david");
  });
});
