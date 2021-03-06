import { ObservableValue } from "../../common/hex/observable_value";
import { Vector2 } from "../canvas_domain";

export interface NetworkNode<TNode> {
  id: string;
  label: string;
  connectionIds: string[];
  value: TNode;
  initialPosition: Vector2;
}

export interface Connection<TConnection> {
  value: TConnection;
  idStart: string;
  idEnd: string;
}

export class NetworkDomain<TNode, TConnection> {
  public nodes: ObservableValue<NetworkNode<TNode>[]>;
  public edges: ObservableValue<Connection<TConnection>[]>;
  public instructionText: ObservableValue<string | null>;

  constructor() {
    this.nodes = new ObservableValue<NetworkNode<TNode>[]>([]);
    this.edges = new ObservableValue<Connection<TConnection>[]>([]);
    this.instructionText = new ObservableValue<string | null>(null);
  }

  setInstructionText(message: string | null) {
    this.instructionText.setValue(message);
  }

  addNode(newNode: NetworkNode<TNode>) {
    this.nodes.transformValue((old) => [...old, newNode]);
  }

  removeNode(id: string) {
    const curNodes = this.nodes.getValue().filter((node) => node.id !== id);
    curNodes.forEach((node) => {
      node.connectionIds = node.connectionIds.filter(
        (connectionId) => connectionId !== id
      );
    });
    this.nodes.setValue(curNodes);
  }

  addConnection(idStart: string, idEnd: string, value: TConnection) {
    const n = this.nodes.getValue();
    const first = n.find((v) => v.id === idStart);
    const second = n.find((v) => v.id === idEnd);
    if (
      first &&
      second &&
      first.connectionIds.find((c) => c === second.id) === undefined
    ) {
      first.connectionIds.push(second.id);
    }
    this.nodes.setValue([...n]);
    this.edges.transformValue((old) => [
      ...old,
      { idStart: idStart, idEnd: idEnd, value: value },
    ]);
  }

  removeConnection(idStart: string, idEnd: string) {
    const n = this.nodes.getValue();
    const first = n.find((v) => v.id === idStart);
    const second = n.find((v) => v.id === idEnd);
    if (first && second) {
      first.connectionIds = first.connectionIds.filter((v) => v !== idEnd);
      second.connectionIds = second.connectionIds.filter((v) => v !== idStart);
    }
    this.nodes.setValue([...n]);
    this.edges.transformValue((old) =>
      old.filter(
        (connection) =>
          connection.idStart !== idStart || connection.idEnd !== idEnd
      )
    );
  }

  dispose() {
    this.nodes.dispose();
  }
}
