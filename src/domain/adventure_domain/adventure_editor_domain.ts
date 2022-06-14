import { NetworkDomain } from "../network_domain/network_domain";
import { AdventureDomain } from "./adventure_domain";
import { CreateChoiceAction, EditorAction } from "./editor_action";
import { Moment, Choice, PositionedMoment } from "./types";

export class AdventureEditorDomain {
  private networkDomain: NetworkDomain<PositionedMoment, Choice>;
  public adventureDomain: AdventureDomain;
  private curAction: EditorAction | null;

  constructor(
    adventureDomain: AdventureDomain,
    networkDomain: NetworkDomain<PositionedMoment, Choice>
  ) {
    this.networkDomain = networkDomain;
    this.adventureDomain = adventureDomain;
    this.curAction = null;
  }

  addMoment(moment: PositionedMoment) {
    this.adventureDomain.addMoment(moment);
    this.networkDomain.addNode({
      id: moment.id,
      label: moment.title,
      connectionIds: moment.choices.map((choice) => choice.momentId),
      value: moment,
      initialPosition: moment.position,
    });
  }

  addChoice(momentId: string, choice: Choice) {
    this.adventureDomain.addChoice(momentId, choice);
    this.networkDomain.addConnection(momentId, choice.momentId, choice);
  }

  clearCurAction() {
    this.curAction = null;
  }

  startCreateChoice(moment: Moment) {
    this.curAction = new CreateChoiceAction(this, this.networkDomain);
    this.onSelectMoment(moment);
  }

  onSelectMoment(moment: Moment) {
    this.curAction?.onSelectMoment(moment);
  }

  deleteMoment(id: string) {
    this.adventureDomain.deleteMoment(id);
    this.networkDomain.removeNode(id);
  }

  deleteChoice(startId: string, endId: string) {
    this.adventureDomain.deleteChoice(startId, endId);
    this.networkDomain.removeConnection(startId, endId);
  }
}
