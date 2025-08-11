import { Paper, Typography, LinearProgress, Stack, IconButton, TextField, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import type { User } from "../../model/User";

type EnglishLevelProps = {
  student: Partial<User>;
  editField: keyof User | null;
  tempValue: string;
  setTempValue: (v: string) => void;
  startEditing: (field: keyof User, value?: string) => void;
  saveChange: () => void;
  cancelChange: () => void;
};

export default function EnglishLevel({
  student,
  editField,
  tempValue,
  setTempValue,
  startEditing,
  saveChange,
  cancelChange,
}: EnglishLevelProps) {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        English Level
      </Typography>

      {/* Level */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          {editField === "level" ? (
            <TextField
              size="small"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              autoFocus
              fullWidth
            />
          ) : (
            <Typography variant="subtitle1" color="primary" fontWeight="bold">
              {student.level || "-"}
            </Typography>
          )}
        </Box>
        {editField === "level" ? (
          <>
            <IconButton onClick={saveChange} size="small">
              <CheckIcon />
            </IconButton>
            <IconButton onClick={cancelChange} size="small">
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => startEditing("level", student.level)} size="small">
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>

      {/* Overall Progress */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Overall Progress
          </Typography>
          {editField === "overall" ? (
            <TextField
              size="small"
              type="number"
              inputProps={{ min: 0, max: 100 }}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              autoFocus
              fullWidth
            />
          ) : (
            <LinearProgress
              variant="determinate"
              value={student.overall || 0}
              sx={{ height: 10, borderRadius: 5 }}
            />
          )}
        </Box>
        {editField === "overall" ? (
          <>
            <IconButton onClick={saveChange} size="small">
              <CheckIcon />
            </IconButton>
            <IconButton onClick={cancelChange} size="small">
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => startEditing("overall", String(student.overall || ""))} size="small">
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>
    </Paper>
  );
}
