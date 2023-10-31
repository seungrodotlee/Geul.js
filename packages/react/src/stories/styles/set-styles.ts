import { CSSProperties } from "react";

import { Colors, colors } from "./theme";

const font = (
  fontFamily: string,
  fontWeight?: CSSProperties["fontWeight"],
  fontSize?: string,
): CSSProperties => ({
  fontFamily,
  fontWeight,
  fontSize,
});

export const setButtonStyles = (
  [background, text]: [Colors, Colors?],
  margin?: string,
): CSSProperties => ({
  padding: "0.375rem 0.75rem",
  borderRadius: "0.25rem",
  background: colors[background],
  color: text ? colors[text] : "white",
  border: 0,
  margin,
  ...font("Pretendard", "bold", "1.125rem"),
});

export const setGeulStyle = (): CSSProperties => ({
  height: "3rem",
  color: colors.secondary,
  ...font("Pretendard", 800, "2rem"),
});
