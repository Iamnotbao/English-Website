import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import type { Word } from "../../model/Word";
import { useState } from "react";
import type { LessonData } from "../../model/LessonData";


type CreateLessonProps = {
    open: boolean,
    handleClose: () => void;
    onCreate : (lesson:LessonData) => void;
}




const AddLesson = ({ open, handleClose,onCreate }: CreateLessonProps) => {

    const [lesson, setLesson] = useState<LessonData>({
        name: "",
        level: "",
        rating: 0,
        image_url: "",
        words: [{ word: "", meaning: "", example: "" }],
    });
    const handleWordChange = (index: number, field: keyof Word, value: string) => {
        const newWords = [...lesson.words];
        newWords[index] = { ...newWords[index], [field]: value };
        setLesson((prev) => ({ ...prev, words: newWords }));
    };
    const addWord = () => {
        setLesson((prev) => ({
            ...prev,
            words: [...prev.words, { word: "", meaning: "", example: "" }],
        }));
    };

    const removeWord = (index: number) => {
        const newWords = lesson.words.filter((_, i) => i !== index);
        setLesson((prev) => ({ ...prev, words: newWords }));
    };
    const handleSubmit = () => {
        onCreate(lesson);
        handleClose();
        setLesson({
            name: "",
            level: "",
            rating: 0,
            image_url: "",
            words: [{ word: "", meaning: "", example: "" }],
        });
    };
    const handleChange = (field: keyof LessonData, value: any) => {
        setLesson((prev) => ({ ...prev, [field]: value }));
    };
    return <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Lesson</DialogTitle>
            <DialogContent>
                <TextField
                    label="Lesson Name"
                    fullWidth
                    margin="normal"
                    value={lesson.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <TextField
                    label="Level"
                    fullWidth
                    margin="normal"
                    value={lesson.level}
                    onChange={(e) => handleChange("level", e.target.value)}
                />
                <TextField
                    label="Rating"
                    type="number"
                    fullWidth
                    margin="normal"
                    inputProps={{ step: 0.1, min: 0, max: 5 }}
                    value={lesson.rating}
                    onChange={(e) => handleChange("rating", Number(e.target.value))}
                />
                <TextField
                    label="Image URL"
                    fullWidth
                    margin="normal"
                    value={lesson.image_url}
                    onChange={(e) => handleChange("image_url", e.target.value)}
                />
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Words
                    <IconButton size="small" color="primary" onClick={addWord}>
                        <AddIcon />
                    </IconButton>
                </Typography>

                <Grid container spacing={2}>
                    {lesson.words.map((word, index) => (
                        <Grid item xs={6} key={index}>
                            <Box
                                sx={{
                                    border: "1px solid #ddd",
                                    borderRadius: 1,
                                    p: 1,
                                    position: "relative",
                                }}
                            >
                                <TextField
                                    label="Word"
                                    fullWidth
                                    margin="dense"
                                    value={word.word}
                                    onChange={(e) => handleWordChange(index, "word", e.target.value)}
                                />
                                <TextField
                                    label="Meaning"
                                    fullWidth
                                    margin="dense"
                                    value={word.meaning}
                                    onChange={(e) => handleWordChange(index, "meaning", e.target.value)}
                                />
                                <TextField
                                    label="Example"
                                    fullWidth
                                    margin="dense"
                                    value={word.example}
                                    onChange={(e) => handleWordChange(index, "example", e.target.value)}
                                />
                                {lesson.words.length > 1 && (
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => removeWord(index)}
                                        sx={{ position: "absolute", top: 4, right: 4 }}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button variant="contained" onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    </>
}
export default AddLesson;