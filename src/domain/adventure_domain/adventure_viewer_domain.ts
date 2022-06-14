import { ObservableValue } from "../../common/hex/observable_value";
import { AdventureDomain } from "./adventure_domain";
import { Choice, Moment } from "./types";

export class AdventureViewerDomain {
  adventureDomain: AdventureDomain;
  curMoment: ObservableValue<Moment | undefined>;
  curFlags: ObservableValue<string[]>;

  constructor(adventureDomain: AdventureDomain) {
    this.adventureDomain = adventureDomain;
    const moments = this.adventureDomain.moments.getValue();
    const startMoment = moments.find((m) => m.title.includes("(start)"));
    this.curMoment = new ObservableValue<Moment | undefined>(startMoment);
    this.curFlags = new ObservableValue<string[]>([]);
  }

  choose(choice: Choice) {
    const moment = this.adventureDomain.moments
      .getValue()
      .find((m) => m.id === choice.momentId);
    this.curMoment.setValue(moment);
    this.curFlags.transformValue((flags) => [...flags, ...choice.flagsToAdd]);
  }
}
