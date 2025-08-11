import { Paper, Typography, Stack, Chip, IconButton, TextField, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import type { User } from "../../model/User";
import { useState } from "react";

type CertsProps = {
  student: Partial<User>;
  onChange: (changes: Partial<User>) => void;
  saveChange: (changes: Partial<User>) => void;
};

export default function Certifications({ student, onChange, saveChange }: CertsProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [addingNew, setAddingNew] = useState(false);

  const startEdit = (index: number, value: string) => {
    setEditingIndex(index);
    setTempValue(value);
    setAddingNew(false);
  };

const saveEdit = () => {
  if (editingIndex === null) return;
  const certs = [...(student.certifications || [])];
  certs[editingIndex] = tempValue;
  onChange({ certifications: certs });  // update UI state
  saveChange({ certifications: certs }); // persist backend update
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
    const certs = [...(student.certifications || []), tempValue.trim()];
    onChange({ certifications: certs });
    setAddingNew(false);
    setTempValue("");
  };

  const cancelAdd = () => {
    setAddingNew(false);
    setTempValue("");
  };

  const removeCert = (index: number) => {
    const certs = [...(student.certifications || [])];
    certs.splice(index, 1);
    onChange({ certifications: certs });
  };

  return (
    <Paper sx={{ p: 2, borderRadius: 2, mb: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Certifications
        </Typography>
        {!addingNew && (
          <IconButton onClick={startAdd} size="small" title="Add Certification">
            <AddIcon />
          </IconButton>
        )}
      </Stack>

      <Stack spacing={1} sx={{ mt: 1, flexWrap: "wrap" }} direction="row">
        {(student.certifications || []).map((cert, i) =>
          editingIndex === i ? (
            <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                size="small"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                autoFocus
              />
              <IconButton onClick={saveEdit} size="small">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={cancelEdit} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <Chip
              key={i}
              label={cert}
              onDelete={() => removeCert(i)}
              onClick={() => startEdit(i, cert)}
              color="success"
              variant="outlined"
              sx={{ cursor: "pointer" }}
            />
          )
        )}

        {addingNew && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              autoFocus
              placeholder="New certification"
            />
            <IconButton onClick={saveAdd} size="small">
              <CheckIcon />
            </IconButton>
            <IconButton onClick={cancelAdd} size="small">
              <CancelIcon />
            </IconButton>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
