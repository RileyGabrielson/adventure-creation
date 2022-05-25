import React, { CSSProperties } from "react";

interface InputProps {
  style?: CSSProperties;
  onChange?: (val: string) => void;
}

export const Input = ({ style, onChange }: InputProps) => {
  return <span contentEditable role="textbox" style={style} />;
};
