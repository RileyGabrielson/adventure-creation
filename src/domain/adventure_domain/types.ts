import { Vector2 } from "../canvas_domain";

export type Flags = Record<string, boolean>;

export interface Choice {
  momentId: string;
  description: string;
  requiredFlags: string[];
  flagsToAdd: string[];
}

export interface Moment {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
}

export interface PositionedMoment extends Moment {
  position: Vector2;
}
