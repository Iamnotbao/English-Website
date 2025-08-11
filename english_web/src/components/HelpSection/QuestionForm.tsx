
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Autocomplete,
} from "@mui/material";
import type { QuestionData } from "../../model/QuestionData";



interface AskNowFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: QuestionData) => Promise<void> | void;
    author_id:string
}

const typeOptions = ["lesson", "discussion", "faq"];
const tagOptions = ["Grammar", "Speaking", "Vocabulary", "Listening"];

export default function QuestionForm({
    open,
    onClose,
    onSubmit,
    author_id
}: AskNowFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = React.useState<string | undefined>(undefined);
    const [tags, setTags] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ title?: string; content?: string; tags?: string }>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!content.trim()) newErrors.content = "Content is required";
        if (tags.length === 0) newErrors.tags = "At least one tag is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            await onSubmit({
                author_id: author_id,
                title: title.trim(),
                content: content.trim(),
                type: type || undefined,
                tags,
                share_counts: 0,
            });
            setTitle("");
            setContent("");
            setType(undefined);
            setTags([]);
            onClose();
        } catch (error) {
            console.error("Submit error", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (loading) return;
        setErrors({});
        setTitle("");
        setContent("");
        setType(undefined);
        setTags([]);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Ask a New Question</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={!!errors.title}
                        helperText={errors.title}
                        disabled={loading}
                    />
                    <TextField
                        label="Content"
                        fullWidth
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        error={!!errors.content}
                        helperText={errors.content}
                        disabled={loading}
                    />
                    <Autocomplete
                        options={typeOptions}
                        value={type}
                        onChange={(_, newValue) => setType(newValue ?? undefined)}
                        renderInput={(params) => <TextField {...params} label="Type (optional)" disabled={loading} />}
                    />
                    <Autocomplete
                        multiple
                        options={tagOptions}
                        value={tags}
                        onChange={(_, newValue:string[]) => setTags(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tags"
                                error={!!errors.tags}
                                helperText={errors.tags}
                                disabled={loading}
                            />
                        )}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
