import { Typography, Stack, Paper, IconButton, TextField, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import type { User } from "../../model/User";

type ContactProps = {
  student: Partial<User>;
  editField: keyof User | null;
  tempValue: string;
  setTempValue: (v: string) => void;
  startEditing: (field: keyof User, value: string | undefined) => void;
  saveChange: () => void;
  cancelChange: () => void;
};
export default function Contact({
  student,
  editField,
  tempValue,
  setTempValue,
  startEditing,
  saveChange,
  cancelChange,
}: ContactProps) {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Contact Information</Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <PhoneIcon sx={{ color: "primary.main" }} />
        {editField === "phone" ? (
          <>
            <TextField
              size="small"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              sx={{ flexGrow: 1 }}
              autoFocus
            />
            <IconButton onClick={saveChange} size="small"><CheckIcon /></IconButton>
            <IconButton onClick={cancelChange} size="small"><CloseIcon /></IconButton>
          </>
        ) : (
          <>
            <Typography sx={{ flexGrow: 1 }}>{student.phone || "-"}</Typography>
            <IconButton onClick={() => startEditing("phone", student.phone)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <HomeIcon sx={{ color: "primary.main" }} />
        {editField === "address" ? (
          <>
            <TextField
              size="small"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              sx={{ flexGrow: 1 }}
              autoFocus
            />
            <IconButton onClick={saveChange} size="small"><CheckIcon /></IconButton>
            <IconButton onClick={cancelChange} size="small"><CloseIcon /></IconButton>
          </>
        ) : (
          <>
            <Typography sx={{ flexGrow: 1 }}>{student.address || "-"}</Typography>
            <IconButton onClick={() => startEditing("address", student.address)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Stack>
    </Paper>
  );
}
