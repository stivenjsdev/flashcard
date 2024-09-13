export type Deck = {
  id: number;
  name: string;
  cards: Card[];
};

export type Card = {
  id: number;
  question: string;
  answer: string;
};
