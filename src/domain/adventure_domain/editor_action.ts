import { NetworkDomain } from "../network_domain/network_domain";
import { AdventureEditorDomain } from "./adventure_editor_domain";
import { Choice, Moment } from "./types";

export abstract class EditorAction {
  protected domain: AdventureEditorDomain;
  protected networkDomain: NetworkDomain<Moment, Choice>;

  constructor(
    domain: AdventureEditorDomain,
    network: NetworkDomain<Moment, Choice>
  ) {
    this.domain = domain;
    this.networkDomain = network;
  }

  abstract onSelectMoment(moment: Moment): void;
}

export class CreateChoiceAction extends EditorAction {
  startingNodeId: string | null = null;

  onSelectMoment(moment: Moment): void {
    if (this.startingNodeId === null) {
      this.startingNodeId = moment.id;
    } else {
      this.domain.addChoice(this.startingNodeId, {
        momentId: moment.id,
        description: "mock description",
      });
      this.domain.clearCurAction();
    }
  }
}
