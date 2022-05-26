import React, { useRef } from "react";
import { useCanvasDomain } from "../../providers/canvas_domain_provider";
import { useAsyncValue } from "../../common/hooks/use_async_value";
import { Choice } from "../../domain/adventure_domain/types";
import { makeStyles } from "../../common/hooks/make_styles";

interface ChoiceViewProps {
  idFirst: string;
  idSecond: string;
  choice: Choice;
}

export const renderChoiceView = (
  choice: Choice,
  idFirst: string,
  idSecond: string
) => {
  return (
    <ChoiceView
      key={idFirst + idSecond}
      idFirst={idFirst}
      idSecond={idSecond}
      choice={choice}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  description: {
    position: "absolute",
    padding: theme.spacing(1),
    maxWidth: "325px",
    minWidth: "150px",
    fontSize: "18px",
    backgroundColor: theme.palette.secondary,
  },
}));

export const ChoiceView = ({ idFirst, idSecond, choice }: ChoiceViewProps) => {
  const styles = useStyles();
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

  const contentRef = useRef<HTMLDivElement | null>(null);

  const yPos =
    (firstY + secondY) / 2 - (contentRef.current?.scrollHeight ?? 0) / 2;
  const xPos =
    (firstX + secondX) / 2 - (contentRef.current?.scrollWidth ?? 0) / 2;

  return (
    <div
      ref={contentRef}
      style={{ ...styles.description, top: yPos, left: xPos }}
    >
      {choice.description}
    </div>
  );
};
