import React, { useState } from "react";
import { makeStyles } from "../../common/hooks/make_styles";
import { clsx } from "../../common/styles/clsx";
import { Moment } from "../../domain/adventure_domain/types";
import { useAdventureEditorDomain } from "../../providers/adventure_editor_domain_provider";
import { MomentMenu } from "./MomentMenu";

export function renderMomentView(moment: Moment) {
  return <MomentView moment={moment} />;
}

interface MomentViewProps {
  moment: Moment;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    userSelect: "none",
    color: theme.palette.text,
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
  description: {
    fontSize: "18px",
    backgroundColor: theme.palette.secondary,
  },
  textInput: {},
}));

export const MomentView = ({ moment }: MomentViewProps) => {
  const styles = useStyles();
  const [openMenu, setOpenMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const domain = useAdventureEditorDomain();

  return (
    <div
      style={styles.root}
      onContextMenu={(e) => {
        setOpenMenu(!openMenu);
        e.preventDefault();
      }}
      onClick={(e) => {
        domain.onSelectMoment(moment);
        e.stopPropagation();
      }}
    >
      {isEdit ? (
        <EditView moment={moment} />
      ) : (
        <>
          <div style={clsx(styles.textAreas, styles.title)}>{moment.title}</div>
          <div style={clsx(styles.textAreas, styles.description)}>
            {moment.description}
          </div>
        </>
      )}
      <MomentMenu
        onEdit={() => setIsEdit(true)}
        onClose={() => setOpenMenu(false)}
        isOpen={openMenu}
        isEdit={isEdit}
        onSaveEdit={() => setIsEdit(false)}
        moment={moment}
      />
    </div>
  );
};

const EditView = ({ moment }: MomentViewProps) => {
  const styles = useStyles();
  const domain = useAdventureEditorDomain();

  return (
    <>
      <input
        onChange={(e) => {
          domain.adventureDomain.setMomentTitle(
            moment.id,
            e.currentTarget.value
          );
        }}
        defaultValue={moment.title}
        style={clsx(styles.textAreas, styles.title)}
      />
      <input
        onChange={(e) => {
          domain.adventureDomain.setMomentDescription(
            moment.id,
            e.currentTarget.value
          );
        }}
        defaultValue={moment.description}
        style={clsx(styles.textAreas, styles.title)}
      />
    </>
  );
};
