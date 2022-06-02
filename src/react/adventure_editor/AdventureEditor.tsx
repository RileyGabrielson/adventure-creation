import React from "react";
import { makeStyles } from "../../common/hooks/make_styles";
import { getRandomId } from "../../common/utils/random_id";
import { Choice, PositionedMoment } from "../../domain/adventure_domain/types";
import {
  Connection,
  NetworkDomain,
} from "../../domain/network_domain/network_domain";
import AdventureEditorDomainProvider, {
  useAdventureEditorDomain,
} from "../../providers/adventure_editor_domain_provider";
import { useCanvasDomain } from "../../providers/canvas_domain_provider";
import LocalStorageDomainProvider, {
  useLocalStorageDomain,
} from "../../providers/local_storage_domain_provider";
import { useNetworkDomain } from "../../providers/network_domain_provider";
import { Button } from "../common/Button";
import { Network } from "../network/Network";
import { renderChoiceView } from "./ChoiceView";
import { renderMomentView } from "./MomentView";

export const AdventureEditor = () => {
  const networkDomain = new NetworkDomain<PositionedMoment, Choice>();
  return (
    <AdventureEditorDomainProvider networkDomain={networkDomain}>
      <LocalStorageDomainProvider>
        <Network
          domain={networkDomain}
          renderNode={renderMomentView}
          renderConnection={renderChoiceView}
        >
          <AdventureEditorContent />
        </Network>
      </LocalStorageDomainProvider>
    </AdventureEditorDomainProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: "50px",
    backgroundColor: theme.palette.secondary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    gap: theme.spacing(1),
    boxShadow: "8px 8px rgba(0,0,0,0.2)",
    padding: theme.spacing(0.25, 1),
    zIndex: 3000,
  },
  fileSelector: {
    color: theme.palette.text,
    backgroundColor: theme.palette.secondary,
    padding: theme.spacing(1),
    width: "200px",
    height: "25px",
    borderRadius: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  button: {
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.primary,
  },
}));

const AdventureEditorContent = () => {
  const domain = useAdventureEditorDomain();
  const localStorage = useLocalStorageDomain();
  const canvasDomain = useCanvasDomain();
  const networkDomain = useNetworkDomain();
  const styles = useStyles();

  return (
    <div style={styles.root}>
      <Button
        style={styles.button}
        onClick={() =>
          domain.addMoment({
            title: "New Moment",
            id: getRandomId(),
            description: "New Description",
            choices: [],
            position: { x: 50, y: 50 },
          })
        }
      >
        +
      </Button>
      <Button
        style={styles.button}
        onClick={() =>
          localStorage.saveToJson(
            localStorage.getPositionedMoments(
              canvasDomain.draggableComponents.getValue(),
              domain.moments.getValue()
            )
          )
        }
      >
        Save
      </Button>
      <div style={styles.fileSelector}>
        <input
          accept=".json"
          type="file"
          style={{ height: "20px" }}
          onChange={(e) => {
            if (e.currentTarget.files) {
              e.currentTarget.files
                .item(0)
                ?.text()
                .then((t) => {
                  const positionedMoments =
                    localStorage.loadPositionedMoments(t);
                  canvasDomain.draggableComponents.setValue([]);
                  networkDomain.nodes.setValue([]);
                  networkDomain.connections.setValue([]);
                  networkDomain.nodes.setValue(
                    positionedMoments.map((m) => ({
                      label: m.title,
                      id: m.id,
                      connectionIds: m.choices.map((c) => c.momentId),
                      value: m,
                      initialPosition: m.position,
                    }))
                  );
                  const connections: Connection<Choice>[] = [];
                  domain.moments.setValue(positionedMoments);
                  positionedMoments.forEach((p) =>
                    p.choices.forEach((c) =>
                      connections.push({
                        value: c,
                        idStart: p.id,
                        idEnd: c.momentId,
                      })
                    )
                  );
                  networkDomain.connections.setValue(connections);
                });
            }
          }}
        />
      </div>
    </div>
  );
};
