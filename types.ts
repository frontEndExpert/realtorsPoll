
export type PollChoiceId = 'A' | 'B' | 'C' | 'D';

export interface PollOption {
  id: PollChoiceId;
  label: string;
  description: string;
  votes: number;
}

export interface PollState {
  options: PollOption[];
  totalVotes: number;
  selectedOption: PollChoiceId | null;
}

export interface AIInsight {
  title: string;
  suggestion: string;
  toolReference: string;
}
