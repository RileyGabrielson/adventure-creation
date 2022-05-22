export interface Theme {
  palette: Palette;
  spacing: Spacing;
  borderRadius: number;
}

export interface Palette {
  primary: string;
  secondary: string;
  background: Background;
  text: string;
}

export interface Background {
  page: string;
  panel: string;
}

export type Spacing = (
  first: number,
  second?: number,
  third?: number,
  fourth?: number
) => string;
