"use client";

import { useEffect, useState } from "react";
import { Box, Stack, Typography, Chip, Button, Divider, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import CommentItem from "../../components/HelpSection/CommentItem";
import CommentForm from "../../components/HelpSection/CommentForm";
import type { Comment } from "../../model/Comment";
import type { Question } from "../../model/Question";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



export default function QuestionDetail() {
    const { id } = useParams<{ id: string }>();
    const [question, setQuestion] = useState<Question | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    // Giả định user hiện tại
    const currentUserId = "user1";

    useEffect(() => {
        if (!id) return;

        // Giả lập dữ liệu
        setQuestion({
            _id: id,
            title: "How to improve English speaking skills?",
            tags: ["Speaking"],
            votes: 8,
            answersCount: 5,
            createdAt: "2025-08-09T10:00:00Z",
            likes: ["user2", "user3"], // ví dụ có 2 người like
        });

        setComments([
            { id: "c1", author: "Alice", content: "Practice with native speakers daily.", createdAt: "2025-08-09T12:00:00Z" },
            { id: "c2", author: "Bob", content: "Record yourself and listen to improve pronunciation.", createdAt: "2025-08-09T14:30:00Z" },
        ]);
    }, [id]);

    const liked = question?.likes.includes(currentUserId) ?? false;

    const handleLikeToggle = () => {
        if (!question) return;

        const isLiked = question.likes.includes(currentUserId);
        let newLikes: string[];

        if (isLiked) {
            newLikes = question.likes.filter(uid => uid !== currentUserId);
        } else {
            newLikes = [...question.likes, currentUserId];
        }

        setQuestion({ ...question, likes: newLikes });
        // TODO: Gửi API cập nhật like lên backend nếu có
    };

    const handleAddComment = (text: string) => {
        const newComment: Comment = {
            id: String(Date.now()),
            author: "You",
            content: text,
            createdAt: new Date().toISOString(),
        };
        setComments(prev => [...prev, newComment]);
    };

    if (!question) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 2 }}>
            {/* Tiêu đề câu hỏi */}
            <Typography variant="h5" fontWeight="bold" mb={1}>
                {question.title}
            </Typography>

            {/* Tag + Votes + Like */}
            <Stack direction="row" spacing={1} mb={2} alignItems="center">
                {question.tags.map(tag => (
                    <Chip key={tag} label={tag} color="primary" size="small" />
                ))}
                <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                    {question.votes} votes · {question.answersCount} answers
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

            <Divider sx={{ my: 2 }} />

            {/* Danh sách bình luận */}
            <Typography variant="h6" fontWeight="bold" mb={1}>
                Answers
            </Typography>
            <Stack spacing={1.5}>
                {comments.map(c => (
                    <CommentItem key={c.id} comment={c} />
                ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Form trả lời */}
            <Typography variant="h6" fontWeight="bold" mb={1}>
                Your Answer
            </Typography>
            <CommentForm onSubmit={handleAddComment} />
        </Box>
    );
}