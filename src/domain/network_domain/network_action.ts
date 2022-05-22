import { NetworkDomain } from "./network_domain";

export abstract class NetworkAction {
  protected domain: NetworkDomain;

  constructor(domain: NetworkDomain) {
    this.domain = domain;
  }

  abstract onSelectNode(id: string): void;
}

export class CreateConnectionAction extends NetworkAction {
  startingNodeId: string | null = null;

  onSelectNode(id: string): void {
    if (this.startingNodeId === null) {
      this.startingNodeId = id;
      this.domain.setInstructionText("Select Connection End Point");
    } else {
      this.domain.addConnection(this.startingNodeId, id);
      this.domain.clearCurAction();
      this.domain.setInstructionText(null);
    }
  }
}
