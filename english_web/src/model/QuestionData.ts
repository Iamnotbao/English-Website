export type QuestionData = {
    author_id: string;
    title: string;
    content: string;
    type?:string;
    tags: string[];
    lesson_id?:string;
    share_counts:number;
};