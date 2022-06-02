import React from "react";
import { Button } from "../common/Button";
import { makeStyledTransition } from "react-motion-ux";
import { makeStyles } from "../../common/hooks/make_styles";
import { useAdventureEditorDomain } from "../../providers/adventure_editor_domain_provider";
import { Moment } from "../../domain/adventure_domain/types";
import { useNetworkDomain } from "../../providers/network_domain_provider";

const useStyles = makeStyles((theme) => ({
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: theme.spacing(1),
    position: "absolute",
    top: `calc(100% + ${theme.spacing(1)})`,
    width: "100%",
    zIndex: 1400,
  },
}));

interface MomentMenuProps {
  onClose?: () => void;
  onEdit?: () => void;
  isOpen?: boolean;
  isEdit?: boolean;
  onSaveEdit?: () => void;
  moment: Moment;
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
  300
);

export const MomentMenu = ({
  onEdit,
  onClose,
  isOpen,
  isEdit,
  onSaveEdit,
  moment,
}: MomentMenuProps) => {
  const domain = useAdventureEditorDomain();
  const networkDomain = useNetworkDomain();
  const ref = useStyledTransition(isOpen ? "visible" : "hidden");
  const styles = useStyles();

  return (
    <div style={styles.menu} ref={ref}>
      {!isEdit ? (
        <>
          <Button
            onClick={(e) => {
              onEdit && onEdit();
              e.stopPropagation();
            }}
          >
            Edit
          </Button>
          <Button
            onClick={(e) => {
              domain.startCreateChoice(moment);
              onClose && onClose();
              e.stopPropagation();
            }}
          >
            Create Connection
          </Button>
          <Button
            onClick={(e) => {
              domain.deleteMoment(moment.id);
              networkDomain.removeNode(moment.id);
              onClose && onClose();
              e.stopPropagation();
            }}
          >
            Delete
          </Button>
        </>
      ) : (
        <Button
          onClick={(e) => {
            onSaveEdit && onSaveEdit();
            onClose && onClose();
            e.stopPropagation();
          }}
        >
          Save
        </Button>
      )}
    </div>
  );
};
