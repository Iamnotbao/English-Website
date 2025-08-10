import type { Word } from "./Word";

export type Lesson ={
    _id:string
    name: string,
    level : string,
    director_name: string,
    rating: number,
    words :Word[],
    createdAt: string,
    updatedAt: string,
    image_url:string,

}