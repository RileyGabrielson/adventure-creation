import React, { useState } from "react";
import { useCanvasDomain } from "../../providers/canvas_domain_provider";
import { useAsyncValue } from "../hooks/use_async_value";

interface ConnectionProps {
  idFirst: string;
  idSecond: string;
}

export const Connection = ({ idFirst, idSecond }: ConnectionProps) => {
  const domain = useCanvasDomain();
  const draggables = useAsyncValue(domain.draggableComponents);
  const first = draggables.find((d) => d.id === idFirst);
  const second = draggables.find((d) => d.id === idSecond);
  const firstX =
    (first?.position.x ?? 0) + (first?.ref.current?.scrollWidth ?? 0) / 2;
  const firstY =
    (first?.position.y ?? 0) - (first?.ref.current?.scrollHeight ?? 0) / 2;
  const secondX =
    (second?.position.x ?? 0) + (second?.ref.current?.scrollWidth ?? 0) / 2;
  const secondY =
    (second?.position.y ?? 0) - (second?.ref.current?.scrollHeight ?? 0) / 2;

  const [isHighlighted, setIsHighlighted] = useState(false);
  const lastClickedComponent = draggables.find((d) => d.lastClicked === true);
  const lastClicked =
    lastClickedComponent?.id === idFirst ||
    lastClickedComponent?.id === idSecond;

  return (
    <>
      <line
        x1={firstX}
        x2={secondX}
        y1={firstY}
        y2={secondY}
        stroke={lastClicked || isHighlighted ? "white" : "black"}
        strokeWidth={lastClicked || isHighlighted ? 3 : 1}
        onMouseEnter={() => setIsHighlighted(true)}
        onMouseLeave={() => setIsHighlighted(false)}
        style={{ zIndex: 1800 }}
      />
      test
    </>
  );
};
