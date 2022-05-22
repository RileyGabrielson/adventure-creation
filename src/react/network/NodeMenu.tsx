import React from "react";
import { useNetworkDomain } from "../../providers/network_domain_provider";
import { Button } from "../common/Button";
import { makeStyledTransition } from "react-motion-ux";
import { makeStyles } from "../../common/hooks/make_styles";

const useStyles = makeStyles((theme) => ({
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: theme.spacing(1),
    position: "absolute",
    top: 50,
    width: 200,
    zIndex: 1400,
  },
}));

interface NodeMenuProps {
  onClose?: () => void;
  isOpen?: boolean;
  nodeId: string;
}

const useStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    visible: {
      opacity: {
        value: 1,
        startAt: 0,
        endAt: 0.5,
      },
      transform: "scale(1)",
    },
    hidden: {
      opacity: {
        value: 0,
        startAt: 0.5,
        endAt: 0.99,
      },
      transform: "scale(0)",
    },
  },
  400
);

export const NodeMenu = ({ onClose, isOpen, nodeId }: NodeMenuProps) => {
  const domain = useNetworkDomain();
  const ref = useStyledTransition(isOpen ? "visible" : "hidden");
  const styles = useStyles();

  return (
    <div style={styles.menu} ref={ref}>
      <Button
        onClick={(e) => {
          domain.startCreateConnection(nodeId);
          onClose && onClose();
          e.stopPropagation();
        }}
      >
        Create Connection
      </Button>
      <Button
        onClick={(e) => {
          onClose && onClose();
          e.stopPropagation();
        }}
      >
        X
      </Button>
    </div>
  );
};
