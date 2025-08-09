import { Button } from "@mui/material";
import { Lesson } from "../../model/Lesson";

type LessonCardProps = {
    lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
    console.log("detail", lesson.image_url);
    return (
        <>
            {lesson ? (<div className="border">
                <img className="max-w-full" src={lesson.image_url} alt="Lesson Thumbnail" />
                <h3>Topic: {lesson.name}</h3>
                <p>Total words : {lesson.words && lesson.words.length > 0?(
                    lesson.words.length
                ):(0)}</p>
                <p>Director : Ms.John</p>
                <p>create at: {lesson.createdAt}</p>
                <p>rating: {lesson.rating}</p>
                <p>Levels: {lesson.level}</p>
                <Button variant="contained">Learn</Button>
            </div>) : (<p>loading....</p>)
            }
        </>

    );
}
export default LessonCard;  