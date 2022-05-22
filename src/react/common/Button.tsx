import React, { CSSProperties } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

const defaultStyle: CSSProperties = {
  width: "150px",
  height: "45px",
  fontSize: "18px",
  backgroundColor: "blue",
  color: "white",
  borderRadius: "8px",
};

export const Button = ({ children, onClick, style }: ButtonProps) => {
  return (
    <button style={{ ...defaultStyle, ...style }} onClick={onClick}>
      {children}
    </button>
  );
};
