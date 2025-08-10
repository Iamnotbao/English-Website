import { Box, Typography, Paper } from "@mui/material";

type CommentProps = {
  comment: {
    id: string;
    author: string;
    content: string;
    createdAt: string;
  };
};

export default function CommentItem({ comment }: CommentProps) {
  return (
    <Paper sx={{ p: 2 }} variant="outlined">
      <Typography variant="body1" mb={1}>
        {comment.content}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        — {comment.author} · {new Date(comment.createdAt).toLocaleString()}
      </Typography>
    </Paper>
  );
}
