import React, { CSSProperties, useState } from "react";
import { useCanvasDomain } from "../../providers/canvas_domain_provider";
import { useNetworkDomain } from "../../providers/network_domain_provider";
import { Draggable, DraggableProps } from "../canvas/Draggable";
import { Button } from "../common/Button";
import { useAsyncValue } from "../hooks/use_async_value";
import { NodeMenu } from "./NodeMenu";

interface NodeProps extends Omit<DraggableProps, "children" | "initialPos"> {
  label: string;
}

const style: CSSProperties = {
  height: "40px",
  width: "200px",
  backgroundColor: "#949494",
  fontSize: "22px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  color: "white",
  userSelect: "none",
};

const buttonStyle: CSSProperties = {
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
};

const lastClickedStyle: CSSProperties = {
  border: "1px solid white",
};

export const NodeView = ({ label, id, ...props }: NodeProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const domain = useNetworkDomain();
  const canvasDomain = useCanvasDomain();
  const lastClicked =
    useAsyncValue(canvasDomain.draggableComponents).find((c) => c.id === id)
      ?.lastClicked ?? false;

  return (
    <Draggable id={id} {...props}>
      <div
        onClick={() => domain.onSelectNode(id)}
        style={lastClicked ? { ...style, ...lastClickedStyle } : style}
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
          style={buttonStyle}
        >
          +
        </Button>
      </div>
    </Draggable>
  );
};
