import { Paper, Typography, Stack, Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import type { User } from "../../model/User";
import { useState } from "react";

type GalleryProps = {
  student: Partial<User>;
  onChange: (changes: Partial<User>) => void;
};

export default function Gallery({ student, onChange }: GalleryProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [tempValue, setTempValue] = useState("");

  const startEdit = (index: number, value: string) => {
    setEditingIndex(index);
    setTempValue(value);
    setAddingNew(false);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const gallery = [...(student.gallery || [])];
    gallery[editingIndex] = tempValue;
    onChange({ gallery });
    setEditingIndex(null);
    setTempValue("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setTempValue("");
  };

  const startAdd = () => {
    setAddingNew(true);
    setTempValue("");
    setEditingIndex(null);
  };

  const saveAdd = () => {
    if (!tempValue.trim()) return;
    const gallery = [...(student.gallery || []), tempValue.trim()];
    onChange({ gallery });
    setAddingNew(false);
    setTempValue("");
  };

  const cancelAdd = () => {
    setAddingNew(false);
    setTempValue("");
  };

  const removeImage = (index: number) => {
    const gallery = [...(student.gallery || [])];
    gallery.splice(index, 1);
    onChange({ gallery });
  };

  return (
    <Paper sx={{ p: 2, borderRadius: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gallery
        </Typography>
        {!addingNew && (
          <IconButton onClick={startAdd} size="small" title="Add Image URL">
            <AddIcon />
          </IconButton>
        )}
      </Stack>

      <Stack spacing={1} direction="row" flexWrap="wrap" gap={1}>
        {(student.gallery || []).map((img, i) =>
          editingIndex === i ? (
            <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                size="small"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                autoFocus
                sx={{ width: 250 }}
              />
              <IconButton onClick={saveEdit} size="small">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={cancelEdit} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <Box
              key={i}
              component="img"
              src={img}
              alt={`gallery-${i}`}
              sx={{
                width: 120,
                height: 90,
                objectFit: "cover",
                borderRadius: 1,
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => startEdit(i, img)}
            />
          )
        )}
      </Stack>
    </Paper>
  );
}
