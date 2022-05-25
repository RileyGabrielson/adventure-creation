import { ObservableValue } from "../../common/hex/observable_value";
import { NetworkDomain } from "../network_domain/network_domain";
import { CreateChoiceAction, EditorAction } from "./editor_action";
import { Moment, Choice } from "./types";

export class AdventureEditorDomain {
  private networkDomain: NetworkDomain<Moment>;
  moments: ObservableValue<Moment[]>;
  private curAction: EditorAction | null;

  constructor(networkDomain: NetworkDomain<Moment>) {
    this.networkDomain = networkDomain;
    this.moments = new ObservableValue<Moment[]>([]);
    this.curAction = null;
  }

  addMoment(moment: Moment) {
    this.moments.transformValue((old) => [...old, moment]);
    this.networkDomain.addNode({
      id: moment.id,
      label: moment.title,
      connectionIds: moment.choices.map((choice) => choice.momentId),
      value: moment,
    });
  }

  removeMoment(id: string) {
    this.moments.transformValue((old) => old.filter((v) => v.id !== id));
    this.networkDomain.removeNode(id);
  }

  addChoice(momentId: string, choice: Choice) {
    const curMoments = this.moments.getValue();
    const moment = curMoments.find((moment) => moment.id === momentId);
    if (moment && moment.id != choice.momentId) {
      moment.choices = [...moment.choices, choice];
      this.networkDomain.addConnection(momentId, choice.momentId);
      this.moments.setValue(this.moments.getValue());
    }
  }

  removeChoice(momentId: string, choiceMomentId: string) {
    const curMoments = this.moments.getValue();
    const moment = curMoments.find((moment) => moment.id === momentId);
    if (moment) {
      moment.choices = moment.choices.filter(
        (c) => c.momentId !== choiceMomentId
      );
      this.moments.setValue(this.moments.getValue());
      this.networkDomain.removeConnection(momentId, choiceMomentId);
    }
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

  dispose() {
    this.moments.dispose();
  }
}
