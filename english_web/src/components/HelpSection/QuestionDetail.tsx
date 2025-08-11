
import { useEffect, useState } from "react";
import { Box, Stack, Typography, Chip, Button, Divider, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import CommentItem from "../../components/HelpSection/CommentItem";
import CommentForm from "../../components/HelpSection/CommentForm";
import type { Comment } from "../../model/Comment";
import type { Question } from "../../model/Question";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { GetPostById, ToggleLike } from "../../service/PostService";
import { CreateComment, GetCommentByPost } from "../../service/CommentService";
import type { CommentData } from "../../model/CommentData";



export default function QuestionDetail() {
    const { id } = useParams<{ id: string }>();
    const [question, setQuestion] = useState<Question | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    const user = localStorage.getItem("user");
    if (!user) return console.log("user has not stored!");
    const userObj = JSON.parse(user);
    const currentUserId = userObj._id;
    const fetchDetailPost = async () => {
        if (userObj && id) {
            const response = await GetPostById(id, userObj.access_token);
            if (response) {
                console.log(response);
                setQuestion(response.post);
            }
            else {
                console.log("There are no post at all ");
            }
        }
        else {
            console.log("user cannot be parsed to object!");

        }
    }
    const fetchCommentByPost = async () => {
        if (userObj && id) {
            const response = await GetCommentByPost(id, userObj.access_token);
            if (response) {
                console.log(response);
                setComments(response.comments);
            }
            else {
                console.log("There are no post at all ");
            }
        }
        else {
            console.log("user cannot be parsed to object when comes to fetch comment!");

        }
    }
    useEffect(() => {
        if (!id) return;
        fetchDetailPost();
        fetchCommentByPost();
    }, [id]);

    const liked = question?.likes.includes(currentUserId) ?? false;

    const handleLikeToggle = async () => {
        if (!question) return;
        const isLiked = question.likes.includes(currentUserId);
        let newLikes: string[];
        if (isLiked) {
            newLikes = question.likes.filter(uid => uid !== currentUserId);
        } else {
            newLikes = [...question.likes, currentUserId];
        }
        setQuestion(prev => prev ? { ...prev, likes: newLikes } : prev);
        try {
            await ToggleLike(question._id,userObj._id, userObj.access_token);
        } catch (error) {
            console.error("Failed to toggle like", error);
            setQuestion(prev => prev ? { ...prev, likes: question.likes } : prev);
        }
    };

    const handleAddComment = async (text: string) => {
        try {
            const newComment: CommentData = {
                content: text,
            };
            if (userObj && id) {
                const response = await CreateComment(id, userObj._id, newComment, userObj.access_token);
                if (response) {
                    console.log(response);
                    const newC = response.comment;
                    setComments(prev => [...prev, newC]);
                    setQuestion(prev =>
                        prev ? { ...prev, comments: [...prev.comments, newC._id] } : prev
                    );
                }
            }
            else {
                if (!userObj) {
                    console.log("user hasn't been stored!");
                }
                else {
                    console.log("id has not been passed!");
                }
            }
        } catch (error) {
            console.error(error);
        }

    };

    if (!question) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 2 }}>
            <Stack sx={{ border: 1, borderColor: "#686868", borderRadius: "10px", bgcolor: "white", paddingLeft: "13px", paddingTop: "10px" }}>
                <Typography variant="h5" fontWeight="bold" mb={1}>
                    Question: {question.title}
                </Typography>
                <Typography variant="h6" fontWeight="500" mb={1}>
                    {question.content}
                </Typography>
                <Stack direction="row" spacing={1} mb={1} alignItems="center">
                    {question.tags.map(tag => (
                        <Chip key={tag} label={tag} color="primary" size="small" />
                    ))}
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        {question.votes} votes · {question.comments.length} answers
                    </Typography>
                    <IconButton
                        size="small"
                        color={liked ? 'error' : 'default'}
                        aria-label="Like"
                        onClick={handleLikeToggle}
                    >
                        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                        {question.likes.length} likes
                    </Typography>
                </Stack>

            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight="bold" mb={1}>
                Answers
            </Typography>
            <Stack spacing={1.5}>
                {comments.map(c => (
                    <CommentItem key={c._id} comment={c} />
                ))}
            </Stack>

            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" fontWeight="bold" mb={1}>
                Your Answer
            </Typography>
            <CommentForm onSubmit={handleAddComment} />
        </Box>
    );
}