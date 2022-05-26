import React from "react";
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

interface NetworkProps<TNode, TConnection> {
  renderNode?: (val: TNode) => JSX.Element;
  renderConnection?: (
    val: TConnection,
    idStart: string,
    idEnd: string
  ) => JSX.Element;
  children?: React.ReactNode;
  domain?: NetworkDomain<TNode, TConnection>;
}

function NetworkContents<TNode, TConnection>({
  children,
  renderNode,
  renderConnection,
}: NetworkProps<TNode, TConnection>) {
  const domain = useNetworkDomain();
  const message = useAsyncValue(domain.instructionText);
  const styles = useStyles();
  const nodes = useAsyncValue(domain.nodes);
  const connections = useAsyncValue(domain.connections);

  return (
    <Canvas>
      {nodes.map((node, index) => (
        <Draggable id={node.id} key={index}>
          {renderNode ? renderNode(node.value) : defaultNodeRender(node.id)}
        </Draggable>
      ))}
      {connections.map((connection) => {
        if (renderConnection) {
          return renderConnection(
            connection.value,
            connection.idStart,
            connection.idEnd
          );
        } else return null;
      })}
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ backgroundColor: "rgba(0,0,0,0)" }}
      >
        {connections.map((connection, index) =>
          defaultConnectionRender(connection.idStart, connection.idEnd)
        )}
      </svg>
      {children}
      <div style={styles.message}>{message}</div>
    </Canvas>
  );
}

const defaultNodeRender = (id: string) => (
  <DefaultNodeView label="Default Render" id={id} key={getRandomId()} />
);

const defaultConnectionRender = (idFirst: string, idSecond: string) => (
  <Connection
    idFirst={idFirst}
    idSecond={idSecond}
    key={getRandomId()}
    showDirection
  />
);

export function Network<TNode, TConnection>({
  children,
  renderNode,
  renderConnection,
  domain,
}: NetworkProps<TNode, TConnection>) {
  return (
    <NetworkDomainProvider customDomain={domain}>
      <NetworkContents
        renderConnection={renderConnection}
        renderNode={renderNode}
      >
        {children}
      </NetworkContents>
    </NetworkDomainProvider>
  );
}
