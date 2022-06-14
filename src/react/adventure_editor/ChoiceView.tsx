import React, { useRef, useState } from "react";
import { useCanvasDomain } from "../../providers/canvas_domain_provider";
import { useAsyncValue } from "../../common/hooks/use_async_value";
import { Choice } from "../../domain/adventure_domain/types";
import { makeStyles } from "../../common/hooks/make_styles";
import { ChoiceMenu } from "./ChoiceMenu";
import { useAdventureEditorDomain } from "../../providers/adventure_editor_domain_provider";
import { clsx } from "../../common/styles/clsx";
import { useNetworkDomain } from "../../providers/network_domain_provider";

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
    color: theme.palette.text,
    position: "absolute",
    padding: theme.spacing(1),
    maxWidth: "325px",
    minWidth: "150px",
    fontSize: "18px",
    backgroundColor: theme.palette.secondary,
    cursor: "pointer",
  },
  textAreas: {
    padding: theme.spacing(1),
    maxWidth: "325px",
    minWidth: "150px",
    color: theme.palette.text,
  },
  title: {
    fontSize: "24px",
    backgroundColor: theme.palette.primary,
  },
}));

const multipleConnectionsOffset = { x: 20, y: 15 };

export const ChoiceView = ({ idFirst, idSecond, choice }: ChoiceViewProps) => {
  const styles = useStyles();
  const domain = useCanvasDomain();
  const networkDomain = useNetworkDomain();
  const adventureEditorDomain = useAdventureEditorDomain();
  const moments = useAsyncValue(adventureEditorDomain.adventureDomain.moments);
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

  const yPos = (firstY + secondY) / 2;
  const xPos =
    (firstX + secondX) / 2 - (contentRef.current?.scrollWidth ?? 0) / 2;

  const [isEdit, setIsEdit] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      ref={contentRef}
      style={{ ...styles.description, top: yPos, left: xPos }}
      onClick={(e) => {
        e.preventDefault();
        setMenuOpen(isEdit || !menuOpen);
      }}
    >
      {isEdit ? (
        <EditView idFirst={idFirst} idSecond={idSecond} choice={choice} />
      ) : (
        <>
          <div>{choice.description}</div>
          <div>
            {choice.flagsToAdd.length > 0 && (
              <div>State Additions: {choice.flagsToAdd.join(", ")}</div>
            )}
          </div>
          <div>
            {choice.requiredFlags.length > 0 && (
              <div>Required Flags: {choice.requiredFlags.join(", ")}</div>
            )}
          </div>
        </>
      )}
      <ChoiceMenu
        isEdit={isEdit}
        isOpen={menuOpen}
        onEdit={() => setIsEdit(true)}
        onDelete={() => {
          networkDomain.removeConnection(idFirst, idSecond);
          adventureEditorDomain.adventureDomain.deleteChoice(idFirst, idSecond);
        }}
        onSaveEdit={() => {
          setIsEdit(false);
          setMenuOpen(false);
        }}
      />
    </div>
  );
};

const EditView = ({ idFirst, idSecond, choice }: ChoiceViewProps) => {
  const styles = useStyles();
  const domain = useAdventureEditorDomain();

  return (
    <>
      <input
        onChange={(e) => {
          domain.adventureDomain.setChoiceDescription(
            idFirst,
            idSecond,
            e.currentTarget.value
          );
        }}
        defaultValue={choice.description}
        style={clsx(styles.textAreas, styles.title)}
      />
      <input
        onChange={(e) => {
          domain.adventureDomain.setChoiceFlagAdditions(
            idFirst,
            idSecond,
            e.currentTarget.value
          );
        }}
        defaultValue={choice.flagsToAdd.join(", ")}
        style={clsx(styles.textAreas, styles.title)}
      />
      <input
        onChange={(e) => {
          domain.adventureDomain.setChoiceFlagRequirements(
            idFirst,
            idSecond,
            e.currentTarget.value
          );
        }}
        defaultValue={choice.requiredFlags.join(", ")}
        style={clsx(styles.textAreas, styles.title)}
      />
    </>
  );
};
