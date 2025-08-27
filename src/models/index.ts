export type Target = {
  score: number;
  datatypeScores: Array<{ id: string; score: number }>;
  target: { approvedSymbol: string; id: string; approvedName: string };
};
