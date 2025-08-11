import { Box, Typography, Paper, Stack } from "@mui/material";
import type { Comment } from "../../model/Comment";

type CommentProps = {
  comment: Comment;
};

export default function CommentItem({ comment }: CommentProps) {
  return (
    <Paper sx={{ p: 2 }} variant="outlined">
      <Stack direction="row" alignItems="center" spacing={1} sx={{mb:2}}>
        <Box
          component="img"
          src={comment.author_id.avatar}
          alt="avatar"
          loading="lazy"
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Typography variant="caption" color="text.secondary">
          {comment.author_id.username} ·{" "}
          {new Date(comment.createdAt).toLocaleString()}
        </Typography>
      </Stack>
      <Typography variant="body1" mb={1} ml={5}>
        {comment.content}
      </Typography>
    </Paper>
  );
}
