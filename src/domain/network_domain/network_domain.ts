import { ObservableValue } from "../../common/hex/observable_value";
import { CreateConnectionAction, NetworkAction } from "./network_action";

export interface NetworkNode {
  id: string;
  label: string;
  connections: NetworkNode[];
}

interface Connection {
  node1: NetworkNode;
  node2: NetworkNode;
}

export class NetworkDomain {
  public nodes: ObservableValue<NetworkNode[]>;
  public uniqueConnections: ObservableValue<Connection[]>;
  public instructionText: ObservableValue<string | null>;
  private curAction: NetworkAction | null;

  constructor() {
    this.nodes = new ObservableValue<NetworkNode[]>([]);
    this.uniqueConnections = new ObservableValue<Connection[]>([]);
    this.instructionText = new ObservableValue<string | null>(null);
    this.curAction = null;
  }

  setInstructionText(message: string | null) {
    this.instructionText.setValue(message);
  }

  addNode(newNode: NetworkNode) {
    this.nodes.transformValue((old) => [...old, newNode]);
  }

  removeNode(id: string) {
    this.nodes.transformValue((old) => old.filter((v) => v.id !== id));
  }

  addConnection(id1: string, id2: string) {
    const n = this.nodes.getValue();
    const first = n.find((v) => v.id === id1);
    const second = n.find((v) => v.id === id2);
    if (
      first &&
      second &&
      first.connections.find((c) => c.id === second.id) === undefined
    ) {
      first.connections.push(second);
    }
    this.nodes.setValue([...n]);
  }

  removeConnection(id1: string, id2: string) {
    const n = this.nodes.getValue();
    const first = n.find((v) => v.id === id1);
    const second = n.find((v) => v.id === id2);
    if (first && second) {
      first.connections = first.connections.filter((v) => v.id !== id2);
      second.connections = second.connections.filter((v) => v.id !== id1);
    }
    this.nodes.setValue([...n]);
  }

  clearCurAction() {
    this.curAction = null;
  }

  startCreateConnection(id: string) {
    this.curAction = new CreateConnectionAction(this);
    this.onSelectNode(id);
  }

  onSelectNode(id: string) {
    this.curAction?.onSelectNode(id);
  }

  dispose() {
    this.nodes.dispose();
  }
}
