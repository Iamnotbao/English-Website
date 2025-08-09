import type { Word } from "./Word";

export type Lesson ={
    name: string,
    level : string,
    director_name: string,
    rating: number,
    words :Word[],
    createdAt: string,
    updatedAt: string,
    image_url:string,

}