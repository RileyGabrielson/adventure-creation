import React, { useState } from "react";
import { makeStyles } from "../../common/hooks/make_styles";
import { useAsyncValue } from "../../common/hooks/use_async_value";
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
  const [networkDomain] = useState(
    () => new NetworkDomain<PositionedMoment, Choice>()
  );

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
    postion: "fixed",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
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
  leftBar: {
    position: "fixed",
    bottom: 0,
    width: "100px",
    height: "calc(100% - 70px)",
    backgroundColor: theme.palette.secondary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center",
    gap: theme.spacing(1),
    boxShadow: "8px 8px rgba(0,0,0,0.2)",
    padding: theme.spacing(0.25, 1),
    fontSize: "18px",
    zIndex: 3000,
    color: theme.palette.text,
  },
  flagsTitle: {
    fontSize: "24px",
    color: theme.palette.text,
    textDecoration: "underline",
  },
  fileSelector: {
    color: theme.palette.text,
    backgroundColor: theme.palette.secondary,
    padding: theme.spacing(1),
    marginLeft: theme.spacing(3),
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
  const moments = useAsyncValue(domain.adventureDomain.moments);

  return (
    <div style={styles.root}>
      <div style={styles.topBar}>
        <Button
          style={styles.button}
          onClick={() =>
            domain.addMoment({
              title: "New Moment",
              id: getRandomId(),
              description: "New Description",
              choices: [],
              position: { x: 150, y: 150 },
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
                domain.adventureDomain.moments.getValue()
              )
            )
          }
        >
          Save
        </Button>
        <Button
          onClick={() => domain.adventureDomain.activity.setValue("Viewing")}
          style={styles.button}
        >
          View
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
                    // TODO: Throw this in a domain somewhere.
                    const positionedMoments =
                      localStorage.loadPositionedMoments(t);
                    canvasDomain.draggableComponents.setValue([]);
                    networkDomain.nodes.setValue([]);
                    networkDomain.edges.setValue([]);
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
                    domain.adventureDomain.moments.setValue(positionedMoments);
                    positionedMoments.forEach((p) =>
                      p.choices.forEach((c) =>
                        connections.push({
                          value: c,
                          idStart: p.id,
                          idEnd: c.momentId,
                        })
                      )
                    );
                    networkDomain.edges.setValue(connections);
                  });
              }
            }}
          />
        </div>
      </div>
      <div style={styles.leftBar}>
        <div style={styles.flagsTitle}>Flags:</div>
        {Array.from(domain.adventureDomain.getAllFlags(moments)).join(", ")}
      </div>
    </div>
  );
};
