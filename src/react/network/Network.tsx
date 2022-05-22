import React from "react";
import NetworkDomainProvider, {
  useNetworkDomain,
} from "../../providers/network_domain_provider";
import { Canvas } from "../canvas/Canvas";
import { Connection } from "../canvas/Connection";
import { Button } from "../common/Button";
import { useAsyncValue } from "../../common/hooks/use_async_value";
import { NodeView } from "./NodeView";
import { makeStyles } from "../../common/hooks/make_styles";

const useStyles = makeStyles((theme) => ({
  message: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    fontSize: "24px",
    color: theme.palette.text,
  },
}));

const NetworkContents = () => {
  const domain = useNetworkDomain();
  const message = useAsyncValue(domain.instructionText);
  const networkNodes = useAsyncValue(domain.nodes);
  const styles = useStyles();

  return (
    <Canvas>
      <Button
        onClick={() => {
          domain.addNode({
            id: networkNodes.length.toString(),
            label: networkNodes.length.toString(),
            connections: [],
          });
        }}
      >
        New
      </Button>
      {networkNodes.map((node, index) => (
        <NodeView id={node.id} key={index} label={node.label} />
      ))}
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ backgroundColor: "rgba(0,0,0,0)" }}
      >
        {networkNodes.map((node, index) => {
          return node.connections.map((connection) => (
            <Connection
              key={node.id + "-" + connection.id + "-" + index}
              idFirst={node.id}
              idSecond={connection.id}
            />
          ));
        })}
      </svg>
      <div style={styles.message}>{message}</div>
    </Canvas>
  );
};

export const Network = () => {
  return (
    <NetworkDomainProvider>
      <NetworkContents />
    </NetworkDomainProvider>
  );
};
