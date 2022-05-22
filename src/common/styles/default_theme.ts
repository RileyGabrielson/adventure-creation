import { Spacing, Theme } from "./theme";

const pixelsPerUnit = 8;

export const defaultSpacing: Spacing = (
  first: number,
  second?: number,
  third?: number,
  fourth?: number
) => {
  if (second === undefined) return `${first * pixelsPerUnit}px`;
  else if (third === undefined)
    return `${first * pixelsPerUnit}px ${second * pixelsPerUnit}px`;
  else if (second !== undefined && third !== undefined && fourth !== undefined)
    return `${first * pixelsPerUnit}px ${second * pixelsPerUnit}px ${
      third * pixelsPerUnit
    }px ${fourth * pixelsPerUnit}px`;
  return `${first * pixelsPerUnit}px`;
};

export const defaultTheme: Theme = {
  palette: {
    primary: "#72DE92",
    secondary: "#277D8E",
    text: "#fff",
    background: {
      page: "#0A1E59",
      panel: "#174974",
    },
  },
  spacing: defaultSpacing,
  borderRadius: 8,
};
