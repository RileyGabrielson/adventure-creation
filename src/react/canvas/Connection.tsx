import React, { useState } from "react";
import { useCanvasDomain } from "../../providers/canvas_domain_provider";
import { useAsyncValue } from "../../common/hooks/use_async_value";

interface ConnectionProps {
  idFirst: string;
  idSecond: string;
  showDirection?: boolean;
}

export const Connection = ({
  idFirst,
  idSecond,
  showDirection,
}: ConnectionProps) => {
  const domain = useCanvasDomain();
  const draggables = useAsyncValue(domain.draggableComponents);
  const first = draggables.find((d) => d.id === idFirst);
  const second = draggables.find((d) => d.id === idSecond);
  const firstX =
    (first?.position.x ?? 0) + (first?.ref.current?.scrollWidth ?? 0) / 2;
  const firstY =
    (first?.position.y ?? 0) + (first?.ref.current?.scrollHeight ?? 0) / 2;
  const secondX =
    (second?.position.x ?? 0) + (second?.ref.current?.scrollWidth ?? 0) / 2;

  const secondY =
    (second?.position.y ?? 0) + (second?.ref.current?.scrollHeight ?? 0) / 2;

  const [isHighlighted, setIsHighlighted] = useState(false);
  const lastClickedComponent = draggables.find((d) => d.lastClicked === true);
  const lastClicked =
    lastClickedComponent?.id === idFirst ||
    lastClickedComponent?.id === idSecond;

  const lastClickedStart = lastClickedComponent?.id === idFirst;

  const isSelected = showDirection
    ? lastClickedStart || isHighlighted
    : lastClicked || isHighlighted;

  return (
    <line
      x1={firstX}
      x2={secondX}
      y1={firstY}
      y2={secondY}
      stroke={isSelected ? "white" : "black"}
      strokeWidth={isSelected ? 4 : 2}
      onMouseEnter={() => setIsHighlighted(true)}
      onMouseLeave={() => setIsHighlighted(false)}
    />
  );
};
