import { Button } from "@mui/material";
import type { Lesson } from "../../model/Lesson";
import HalfRating from "../Rating/RatingStar";
import { useState } from "react";
import MultipleGame from "../Dialog/MultipleGame";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


type LessonCardProps = {
    lesson: Lesson;
    handleDelete: (id: string) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, handleDelete }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {lesson ? (<div className="border relative bg-[yellow]">
                <div className="max-w-full">
                    <img className="w-full" src={lesson.image_url} alt="Lesson Thumbnail" />
                </div>
                <div className="pl-[8px]">
                    <h3 className="mt-[10px] cursor-pointer">Topic: {lesson.name} </h3>
                    <p className="text-[13px] font-[500] text-[#686868] mb-[4px] mt-[2px]">Create at: {lesson.createdAt}</p>
                    <p className="text-[14px] font-[800] text-[blue] uppercase mb-[4px] cursor-pointer">Author: {lesson.director_name}</p>
                    <p className="text-[14px] uppercase mb-[4px]">Total words: {lesson.words && lesson.words.length > 0 ? (
                        lesson.words.length
                    ) : (0)}</p>
                    <div className="absolute top-[5px] right-[10px] bg-black p-0 m-0"><HalfRating rating={lesson.rating} /></div>
                    <p className="uppercase text-[15px]">Level: <span className="font-[700]">{lesson.level}</span></p>
                </div>

                <div className="flex flex-row justify-center"><Button onClick={handleClickOpen} variant="contained">Learn</Button></div>
                <div className="absolute top-[5px] left-[10px]">
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete(lesson._id)}
                        sx={{
                            minWidth: 24,
                            width: 24,
                            height: 24,
                            padding: 0,
                            borderRadius: '4px',
                            minHeight: 'auto'
                        }}
                    >
                        <DeleteForeverIcon fontSize="small" />
                    </Button>
                </div>
            </div>) : (<p>loading....</p>)
            }
            <MultipleGame open={open} words={lesson.words} handleClose={handleClose} />
        </>

    );
}
export default LessonCard;  