import { ObservableValue } from "../../common/hex/observable_value";

export interface NetworkNode<T> {
  id: string;
  label: string;
  connectionIds: string[];
  value: T;
}

interface Connection<T> {
  node1: NetworkNode<T>;
  node2: NetworkNode<T>;
}

export class NetworkDomain<T> {
  public nodes: ObservableValue<NetworkNode<T>[]>;
  public uniqueConnections: ObservableValue<Connection<T>[]>;
  public instructionText: ObservableValue<string | null>;

  constructor() {
    this.nodes = new ObservableValue<NetworkNode<T>[]>([]);
    this.uniqueConnections = new ObservableValue<Connection<T>[]>([]);
    this.instructionText = new ObservableValue<string | null>(null);
  }

  setInstructionText(message: string | null) {
    this.instructionText.setValue(message);
  }

  addNode(newNode: NetworkNode<T>) {
    this.nodes.transformValue((old) => [...old, newNode]);
    console.log(this.nodes.getValue().length);
  }

  removeNode(id: string) {
    const curNodes = this.nodes.getValue().filter((node) => node.id !== id);
    curNodes.forEach((node) => {
      node.connectionIds = node.connectionIds.filter(
        (connectionId) => connectionId !== id
      );
    });
  }

  addConnection(id1: string, id2: string) {
    const n = this.nodes.getValue();
    const first = n.find((v) => v.id === id1);
    const second = n.find((v) => v.id === id2);
    if (
      first &&
      second &&
      first.connectionIds.find((c) => c === second.id) === undefined
    ) {
      first.connectionIds.push(second.id);
    }
    this.nodes.setValue([...n]);
  }

  removeConnection(id1: string, id2: string) {
    const n = this.nodes.getValue();
    const first = n.find((v) => v.id === id1);
    const second = n.find((v) => v.id === id2);
    if (first && second) {
      first.connectionIds = first.connectionIds.filter((v) => v !== id2);
      second.connectionIds = second.connectionIds.filter((v) => v !== id1);
    }
    this.nodes.setValue([...n]);
  }

  dispose() {
    this.nodes.dispose();
  }
}
