import { CSSProperties } from "react";

export function clsx(...args: (CSSProperties | boolean | undefined)[]) {
  return Object.assign(
    {},
    ...args.filter((a) => typeof a !== "boolean" && a !== undefined)
  );
}
