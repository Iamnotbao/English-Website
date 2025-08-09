import type { Word } from "./Word";

export type LessonData = {
    name: string;
    level: string;
    rating: number;
    image_url: string;
    words: Word[];
};