import { ObservableValue } from "../../common/hex/observable_value";
import { NetworkDomain } from "../network_domain/network_domain";
import { CreateChoiceAction, EditorAction } from "./editor_action";
import { Moment, Choice, PositionedMoment } from "./types";

export class AdventureEditorDomain {
  private networkDomain: NetworkDomain<PositionedMoment, Choice>;
  moments: ObservableValue<Moment[]>;
  private curAction: EditorAction | null;

  constructor(networkDomain: NetworkDomain<PositionedMoment, Choice>) {
    this.networkDomain = networkDomain;
    this.moments = new ObservableValue<Moment[]>([]);
    this.curAction = null;
  }

  addMoment(moment: PositionedMoment) {
    this.moments.transformValue((old) => [...old, moment]);
    this.networkDomain.addNode({
      id: moment.id,
      label: moment.title,
      connectionIds: moment.choices.map((choice) => choice.momentId),
      value: moment,
      initialPosition: moment.position,
    });
  }

  removeMoment(id: string) {
    this.moments.transformValue((old) => old.filter((v) => v.id !== id));
    this.networkDomain.removeNode(id);
  }

  addChoice(momentId: string, choice: Choice) {
    const curMoments = this.moments.getValue();
    const moment = curMoments.find((moment) => moment.id === momentId);
    if (moment && moment.id !== choice.momentId) {
      moment.choices = [...moment.choices, choice];
      this.networkDomain.addConnection(momentId, choice.momentId, choice);
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

  deleteMoment(id: string) {
    this.moments.transformValue((m) => m.filter((v) => v.id !== id));
    const moments = this.moments.getValue();
    moments.forEach(
      (m) => (m.choices = m.choices.filter((v) => v.momentId !== id))
    );
    this.moments.setValue(moments);
  }

  deleteChoice(startId: string, endId: string) {
    const moments = this.moments.getValue();
    moments.forEach((m) => {
      if (m.id === startId) {
        m.choices = m.choices.filter((c) => c.momentId !== endId);
      }
    });
    this.moments.setValue(moments);
  }

  setMomentTitle(id: string, title: string) {
    const moment = this.moments.getValue().find((m) => m.id === id);
    if (moment) moment.title = title;
    this.moments.setValue(this.moments.getValue());
  }

  setMomentDescription(id: string, description: string) {
    const moment = this.moments.getValue().find((m) => m.id === id);
    if (moment) moment.description = description;
    this.moments.setValue(this.moments.getValue());
  }

  setChoiceDescription(startId: string, endId: string, description: string) {
    const moment = this.moments.getValue().find((m) => m.id === startId);
    const choice = moment?.choices.find((choice) => choice.momentId === endId);
    if (choice) choice.description = description;
    this.moments.setValue(this.moments.getValue());
  }

  dispose() {
    this.moments.dispose();
  }
}
