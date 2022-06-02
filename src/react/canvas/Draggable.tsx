import React, { useEffect, useRef } from "react";
import { useCanvasDomain } from "../../providers/canvas_domain_provider";
import { useAsyncValue } from "../../common/hooks/use_async_value";
import { makeStyles } from "../../common/hooks/make_styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    cursor: "pointer",
  },
}));

export interface DraggableProps {
  children: React.ReactNode;
  id: string;
  initialPos: { x: number; y: number };
}

export const Draggable = ({ children, initialPos, id }: DraggableProps) => {
  const domain = useCanvasDomain();
  const styles = useStyles();
  const ref = useRef<HTMLDivElement | null>(null);
  const draggable = useAsyncValue(domain.draggableComponents).find(
    (v) => v.id === id
  );

  useEffect(() => {
    const drag = {
      id: id,
      position: initialPos,
      ref: ref,
    };
    domain.registerDraggable(drag);
    return () => domain.removeDraggable(id);
  }, [domain, id, ref, initialPos]);

  if (!draggable) return null;

  const pos = draggable.position;
  const zIndex = draggable.zIndex;

  return (
    <div
      ref={ref}
      style={{ ...styles.root, top: pos.y, left: pos.x, zIndex: zIndex }}
      onMouseDown={(e) => {
        const mousePos = { x: e.pageX, y: e.pageY };
        domain.handleMouseDown(id, mousePos);
        e.stopPropagation();
      }}
      onMouseUp={(e) => {
        domain.handleMouseUp();
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};
