export type Question = {
  _id: string;
  author_id: {
    _id: string,
    username:string,
    avatar:string
  }
  title: string;
  content:string;
  tags: string[];
  comments: string[];
  votes: number;
  createdAt: string;
  likes: string[];
};