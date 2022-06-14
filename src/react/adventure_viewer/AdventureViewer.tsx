import React from "react";
import { makeStyles } from "../../common/hooks/make_styles";
import { useAsyncValue } from "../../common/hooks/use_async_value";
import AdventureViewerDomainProvider, {
  useAdventureViewerDomain,
} from "../../providers/adventure_viewer_domain_provider";
import { Button } from "../common/Button";

export const AdventureViewer = () => {
  return (
    <AdventureViewerDomainProvider>
      <AdventureViewerContents />
    </AdventureViewerDomainProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  rootButton: {
    marginTop: theme.spacing(2),
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: "24px",
    color: theme.palette.text,
    backgroundColor: theme.palette.primary,
    padding: theme.spacing(1),
    width: "50%",
  },
  description: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: "18px",
    color: theme.palette.text,
    backgroundColor: theme.palette.secondary,
    padding: theme.spacing(1),
    width: "50%",
  },
  choice: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: "18px",
    color: theme.palette.text,
    backgroundColor: theme.palette.primary,
    padding: theme.spacing(1),
    width: "50%",
    marginTop: theme.spacing(1),
  },
}));

const AdventureViewerContents = () => {
  const domain = useAdventureViewerDomain();
  const curMoment = useAsyncValue(domain.curMoment);
  const curFlags = useAsyncValue(domain.curFlags);
  const styles = useStyles();

  if (!curMoment)
    return (
      <div style={styles.root}>
        No Starting Moment Found
        <Button
          style={styles.rootButton}
          onClick={() => domain.adventureDomain.activity.setValue("Editing")}
        >
          Back to Editor
        </Button>
      </div>
    );

  return (
    <div style={styles.root}>
      <div style={styles.title}>{curMoment?.title.replace("(start)", "")}</div>
      <div style={styles.description}>{curMoment.description}</div>
      {curMoment.choices.map((choice) => {
        let isValid = true;
        choice.requiredFlags.forEach((required) => {
          if (curFlags.find((f) => f === required) === undefined) {
            isValid = false;
          }
        });

        return isValid ? (
          <div
            onClick={() => domain.choose(choice)}
            style={styles.choice}
            key={choice.momentId}
          >
            {choice.description}
          </div>
        ) : null;
      })}
      <Button
        style={styles.rootButton}
        onClick={() => domain.adventureDomain.activity.setValue("Editing")}
      >
        Back to Editor
      </Button>
    </div>
  );
};
