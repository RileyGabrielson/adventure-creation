export type Flags = Record<string, boolean>;

export interface Choice {
  momentId: string;
  description: string;
  requiredFlagsForVisible?: string[];
}

export interface Moment {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
}
