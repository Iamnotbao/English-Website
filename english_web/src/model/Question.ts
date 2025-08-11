export type Question = {
  _id: string;
  title: string;
  content:string;
  tags: string[];
  comments: string[];
  votes: number;
  createdAt: string;
  likes: string[];
};