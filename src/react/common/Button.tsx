import React, { CSSProperties, useState } from "react";
import { clsx } from "../../common/styles/clsx";
import { makeStyles } from "../../common/hooks/make_styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.borderRadius,
    backgroundColor: theme.palette.secondary,
    padding: theme.spacing(1),
    color: theme.palette.text,
  },
  hoverRoot: {
    boxShadow: `0px 0px 8px 1px rgba(0,0,0,0.6)`,
    textDecoration: "underline",
  },
  text: {
    fontSize: "18px",
    color: "inherit",
  },
}));

interface ButtonProps {
  style?: CSSProperties;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export const Button = ({ style, onClick, children }: ButtonProps) => {
  const styles = useStyles();
  const [isHover, setHover] = useState(false);

  return (
    <button
      style={clsx(styles.root, isHover && styles.hoverRoot, style)}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={styles.text}>{children}</div>
    </button>
  );
};
