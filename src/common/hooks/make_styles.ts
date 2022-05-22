import { defaultTheme } from "../styles/default_theme";
import { Styles } from "../styles/styles";
import { Theme } from "../styles/theme";

export function makeStyles<ClassNames extends string>(
  styles: Styles<ClassNames> | ((theme: Theme) => Styles<ClassNames>)
): () => Styles<ClassNames> {
  if (typeof styles === "function") return () => styles(defaultTheme);
  return () => styles;
}
