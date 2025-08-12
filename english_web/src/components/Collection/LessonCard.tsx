import { Button, Box, Stack, Typography } from "@mui/material";
import type { Lesson } from "../../model/Lesson";
import HalfRating from "../Rating/RatingStar";
import { useState } from "react";
import MultipleGame from "../Dialog/MultipleGame";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type LessonCardProps = {
    lesson: Lesson;
    handleDelete: (id: string) => void;
};

const LessonCard: React.FC<LessonCardProps> = ({ lesson, handleDelete }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {lesson ? (
                <Box
                    position="relative"
                    bgcolor="yellow"
                    border="1px solid"
                    borderColor="grey.300"
                    borderRadius={1}overflow="hidden"
                >
                    <Box maxWidth="100%">
                        <Box
                            component="img"
                            src={lesson.image_url}
                            alt="Lesson Thumbnail"
                            width="100%"
                        />
                    </Box>
                    <Box pl={1}>
                        <Typography
                            mt={1.25}
                            variant="h6"
                            sx={{ cursor: "pointer" }}
                        >
                            Topic: {lesson.name}
                        </Typography>

                        <Typography fontSize={13} fontWeight={500} color="#686868" mb={0.5}>
                            Create at: {lesson.createdAt}
                        </Typography>

                        <Typography
                            fontSize={14}
                            fontWeight={800}
                            color="blue"
                            textTransform="uppercase"
                            mb={0.5}
                            sx={{ cursor: "pointer" }}
                        >
                            Author: {lesson.director_name}
                        </Typography>
                        <Typography fontSize={14} textTransform="uppercase" mb={0.5}>
                            Total words: {lesson.words?.length || 0}
                        </Typography>
                        <Box
                            position="absolute"
                            top={5}
                            right={10}
                            bgcolor="black"
                            p={0}
                            m={0}
                        >
                            <HalfRating rating={lesson.rating} />
                        </Box>

                        <Typography textTransform="uppercase" fontSize={15}>
                            Level: <Box component="span" fontWeight={700}>{lesson.level}</Box>
                        </Typography>
                    </Box>
                    <Stack direction="row" justifyContent="center" mt={1} mb={1}>
                        <Button onClick={handleClickOpen} variant="contained">
                            Learn
                        </Button>
                    </Stack>
                    <Box position="absolute" top={5} left={10}>
                        <Button
                            color="error"
                            variant="contained"
                            onClick={() => handleDelete(lesson._id)}
                            sx={{
                                minWidth: 24,
                                width: 24,
                                height: 24,
                                padding: 0,
                                borderRadius: "4px",
                                minHeight: "auto",
                            }}
                        >
                            <DeleteForeverIcon fontSize="small" />
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Typography>Loading...</Typography>
            )}
            <MultipleGame open={open} words={lesson.words} handleClose={handleClose} />
        </>
    );
};

export default LessonCard;
