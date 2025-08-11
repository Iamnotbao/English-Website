
export type Comment = {
  _id: string;
  author_id: {
    _id:string;
    username:string;
    avatar?:string;
  };
  post_id:string;
  content: string;
  createdAt: string;
};