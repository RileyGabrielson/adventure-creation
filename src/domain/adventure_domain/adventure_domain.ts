import { ObservableValue } from "../../common/hex/observable_value";
import { Moment, Choice, PositionedMoment } from "./types";

export type AdventureActivity = "Editing" | "Viewing";

export class AdventureDomain {
  moments: ObservableValue<Moment[]>;
  activity: ObservableValue<AdventureActivity>;

  constructor() {
    this.moments = new ObservableValue<Moment[]>([]);
    this.activity = new ObservableValue<AdventureActivity>("Editing");
  }

  addMoment(moment: PositionedMoment) {
    this.moments.transformValue((old) => [...old, moment]);
  }

  addChoice(momentId: string, choice: Choice) {
    const curMoments = this.moments.getValue();
    const moment = curMoments.find((moment) => moment.id === momentId);
    if (moment && moment.id !== choice.momentId) {
      moment.choices = [...moment.choices, choice];
      this.moments.setValue(this.moments.getValue());
    }
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

  setChoiceFlagRequirements(startId: string, endId: string, flags: string) {
    let seperatedFlags = flags.split(", ");
    if (flags === "") seperatedFlags = [];
    const moment = this.moments.getValue().find((m) => m.id === startId);
    const choice = moment?.choices.find((choice) => choice.momentId === endId);
    if (choice) choice.requiredFlags = seperatedFlags;
    this.moments.setValue(this.moments.getValue());
  }

  setChoiceFlagAdditions(startId: string, endId: string, flags: string) {
    let seperatedFlags = flags.split(", ");
    if (flags === "") seperatedFlags = [];
    const moment = this.moments.getValue().find((m) => m.id === startId);
    const choice = moment?.choices.find((choice) => choice.momentId === endId);
    if (choice) choice.flagsToAdd = seperatedFlags;
    this.moments.setValue(this.moments.getValue());
  }

  getAllFlags(moments: Moment[]): Set<string> {
    const flags = new Set<string>();

    moments.forEach((m) => {
      m.choices.forEach((c) => {
        c.flagsToAdd.forEach((f) => flags.add(f));
        c.requiredFlags.forEach((f) => flags.add(f));
      });
    });

    return flags;
  }

  dispose() {
    this.moments.dispose();
  }
}
