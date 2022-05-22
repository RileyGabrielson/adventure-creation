import { CSSProperties } from "react";

export type Styles<ClassNames extends string> = Record<
  ClassNames,
  CSSProperties
>;
