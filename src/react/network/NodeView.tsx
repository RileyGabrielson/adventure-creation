import React, { useState } from "react";
import { useCanvasDomain } from "../../providers/canvas_domain_provider";
import { useNetworkDomain } from "../../providers/network_domain_provider";
import { Draggable, DraggableProps } from "../canvas/Draggable";
import { Button } from "../common/Button";
import { useAsyncValue } from "../../common/hooks/use_async_value";
import { NodeMenu } from "./NodeMenu";
import { makeStyles } from "../../common/hooks/make_styles";

interface NodeProps extends Omit<DraggableProps, "children" | "initialPos"> {
  label: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "40px",
    width: "200px",
    backgroundColor: theme.palette.secondary,
    fontSize: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: theme.palette.primary,
    userSelect: "none",
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "15px",
    height: "15px",
    fontSize: "12px",
    borderRadius: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  lastClicked: {
    border: `1px solid ${theme.palette.text}`,
  },
}));

export const NodeView = ({ label, id, ...props }: NodeProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const domain = useNetworkDomain();
  const canvasDomain = useCanvasDomain();
  const styles = useStyles();
  const lastClicked =
    useAsyncValue(canvasDomain.draggableComponents).find((c) => c.id === id)
      ?.lastClicked ?? false;

  return (
    <Draggable id={id} {...props}>
      <div
        onClick={() => domain.onSelectNode(id)}
        style={
          lastClicked ? { ...styles.root, ...styles.lastClicked } : styles.root
        }
      >
        {label}
        <NodeMenu
          nodeId={id}
          isOpen={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
        />
        <Button
          onClick={(e) => {
            setOpenMenu(!openMenu);
            e.stopPropagation();
          }}
          style={styles.button}
        >
          +
        </Button>
      </div>
    </Draggable>
  );
};
