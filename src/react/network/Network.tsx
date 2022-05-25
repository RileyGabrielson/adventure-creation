import React, { useEffect, useState } from "react";
import NetworkDomainProvider, {
  useNetworkDomain,
} from "../../providers/network_domain_provider";
import { Canvas } from "../canvas/Canvas";
import { Connection } from "../canvas/Connection";
import { useAsyncValue } from "../../common/hooks/use_async_value";
import { DefaultNodeView } from "./DefaultNodeView";
import { makeStyles } from "../../common/hooks/make_styles";
import { getRandomId } from "../../common/utils/random_id";
import { Draggable } from "../canvas/Draggable";
import { NetworkDomain } from "../../domain/network_domain/network_domain";

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

interface NetworkProps<T> {
  render?: (val: T) => JSX.Element;
  children?: React.ReactNode;
  domain?: NetworkDomain<T>;
}

function NetworkContents<T>({ children, render }: NetworkProps<T>) {
  const domain = useNetworkDomain();
  const message = useAsyncValue(domain.instructionText);
  const networkNodes = useAsyncValue(domain.nodes);
  const styles = useStyles();
  const nodes = useAsyncValue(domain.nodes);

  return (
    <Canvas>
      {nodes.map((node, index) => (
        <Draggable id={node.id} key={index}>
          {render ? render(node.value) : defaultRender(node.id)}
        </Draggable>
      ))}
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ backgroundColor: "rgba(0,0,0,0)" }}
      >
        {networkNodes.map((node, index) => {
          return node.connectionIds.map((connectionId) => {
            const connectionNode = networkNodes.find(
              (n) => n.id === connectionId
            );
            if (connectionNode)
              return (
                <Connection
                  key={node.id + "-" + connectionNode.id + "-" + index}
                  idFirst={node.id}
                  idSecond={connectionNode.id}
                  showDirection
                />
              );

            return null;
          });
        })}
      </svg>
      {children}
      <div style={styles.message}>{message}</div>
    </Canvas>
  );
}

const defaultRender = (id: string) => (
  <DefaultNodeView label="Default Render" id={id} key={getRandomId()} />
);

export function Network<T>({ children, render, domain }: NetworkProps<T>) {
  return (
    <NetworkDomainProvider customDomain={domain}>
      <NetworkContents render={render}>{children}</NetworkContents>
    </NetworkDomainProvider>
  );
}
