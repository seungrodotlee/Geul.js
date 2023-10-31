import { CSSProperties } from "react";

import { Colors, colors } from "./theme";

const font = (
  fontFamily: string,
  fontWeight?: CSSProperties["fontWeight"],
): CSSProperties => ({
  fontFamily,
  fontWeight,
});

export const setButtonStyles = (
  color: Colors,
  margin?: string,
): CSSProperties => ({
  padding: "0.375rem 0.75rem",
  borderRadius: "0.25rem",
  fontSize: "1.125rem",
  color: "white",
  background: colors[color],
  border: 0,
  margin,
  ...font("Pretendard", "bold"),
});
