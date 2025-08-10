export type Question = {
  _id: string;
  title: string;
  tags: string[];
  answersCount: number;
  votes: number;
  createdAt: string;
  likes: string[];
};