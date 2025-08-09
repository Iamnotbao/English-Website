import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import type { Word } from '../../model/Word';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type FullScreenDialogProps = {
    words: Word[],
    open: boolean;
    handleClose: () => void;
};

export default function MultipleGame({
    open,
    handleClose,
    words
}: FullScreenDialogProps) {
    const [quizWords, setQuizWords] = React.useState<Word[]>([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
    const [showResult, setShowResult] = React.useState(false);

    const shuffleArray = <T,>(array: T[]): T[] => {
        return [...array].sort(() => Math.random() - 0.5);
    }

    const startQuiz = React.useCallback(() => {
        setQuizWords(shuffleArray(words));
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
    }, [words]);

    React.useEffect(() => {
        if (open) {
            startQuiz();
        }
    }, [open, startQuiz]);


    const currentWord = quizWords[currentIndex];

    const allOptions = React.useMemo(() => {
        if (!currentWord) return [];
        const wrongAnswer = shuffleArray(quizWords.filter((w) => w.word !== currentWord.word).map((w) => w.word)).slice(0, 3);
        return shuffleArray([currentWord.word, ...wrongAnswer])
    }, [currentWord, quizWords]);

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        setShowResult(true);
    };

    const handleNext = () => {
        setSelectedAnswer(null);
        setShowResult(false);
        setCurrentIndex((prev) => prev + 1);
    };

    const isCorrect = selectedAnswer === currentWord?.word;

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Multiple Game
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                {currentWord ? (
                    <div className="w-[600px] flex flex-col justify-center item-center ml-auto mr-auto mt-[20px] gap-20">
                        <Typography variant="h6" gutterBottom>
                            Question {currentIndex + 1} of {quizWords.length}
                        </Typography>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            {currentIndex+1}.{currentWord.meaning}
                        </Typography>
                        <Grid container spacing={2} justifyContent="center">
                            {allOptions.map((option,idx) => (
                                 <Grid item xs={12} sm={6} key={idx}>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            width: 250, 
                                            minHeight: 60, 
                                            p: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            bgcolor:
                                                showResult && option === currentWord.word
                                                    ? 'lightgreen'
                                                    : showResult && option === selectedAnswer
                                                        ? 'salmon'
                                                        : 'white',
                                            pointerEvents: showResult ? 'none' : 'auto',
                                        }}
                                        onClick={() => handleAnswerClick(option)}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {option}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                        {showResult && (
                            <div className="mt-[16px]">
                                <Typography variant='body1' color={isCorrect ? 'green' : 'red'}>
                                    {
                                        isCorrect ? 'Correct' : `Wrong! Correct Answer: ${currentWord.word}`
                                    }
                                </Typography>

                                {currentIndex < quizWords.length - 1 ? (
                                    <Button variant='contained' sx={{ mt: 2 }} onClick={handleNext}>
                                        Next Question
                                    </Button>
                                ) : (
                                    <div className='mt-[16px]'>
                                        <Typography variant='h6' gutterBottom>
                                            Quiz Finished!
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            sx={{ mt: 2, mr: 2 }}
                                            onClick={startQuiz}
                                        >
                                            Restart Quiz
                                        </Button>
                                        <Button variant='outlined' sx={{ mt: 2 }} onClick={handleClose}>
                                            Close
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}


                    </div>

                ) : (<Typography sx={{ p: 2 }}>No Words available</Typography>)
                }
            </Dialog>
        </React.Fragment>
    );
}
