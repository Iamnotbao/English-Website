import { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";

export default function CommentForm({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <Stack spacing={2}>
      <TextField
        multiline
        rows={3}
        placeholder="Write your answer here..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Post Answer
      </Button>
    </Stack>
  );
}