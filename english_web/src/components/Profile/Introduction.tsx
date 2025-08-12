import { Box, Typography, Stack, Card, CardContent, Avatar, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import type { User } from "../../model/User";

type StudentProps = {
  student: Partial<User>;
  editField: keyof User | null;
  tempValue: string;
  setTempValue: (value: string) => void;
  startEditing: (field: keyof User, value: string | undefined) => void;
  saveChange: () => void;
  cancelChange: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Introduction({
  student,
  editField,
  tempValue,
  setTempValue,
  startEditing,
  saveChange,
  cancelChange,
  handleFileChange

}: StudentProps) {
  return (
    <Card sx={{ borderRadius: 3, mb: 3 }}>
      <CardContent>
        <Stack direction="row" spacing={3} alignItems="center">
          <Box position="relative">
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
              <Avatar
                src={student.avatar}
                alt={student.username}
                sx={{ width: 90, height: 90 }}
              />
            </label>
            <IconButton
              component="label"
              htmlFor="avatar-upload"
              sx={{ position: "absolute", bottom: 0, right: 0 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              {editField === "username" ? (
                <>
                  <TextField
                    size="small"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <IconButton onClick={saveChange}><CheckIcon /></IconButton>
                  <IconButton onClick={cancelChange}><CloseIcon /></IconButton>
                </>
              ) : (
                <>
                  <Typography variant="h5" fontWeight="bold">
                    {student.username}
                  </Typography>
                  <IconButton onClick={() => startEditing("username", student.username)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              {editField === "email" ? (
                <>
                  <TextField
                    size="small"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <IconButton onClick={saveChange}><CheckIcon /></IconButton>
                  <IconButton onClick={cancelChange}><CloseIcon /></IconButton>
                </>
              ) : (
                <>
                  <Typography color="text.secondary">{student.email}</Typography>
                  <IconButton onClick={() => startEditing("email", student.email)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              {editField === "bio" ? (
                <>
                  <TextField
                    size="small"
                    multiline
                    rows={3}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <IconButton onClick={saveChange}><CheckIcon /></IconButton>
                  <IconButton onClick={cancelChange}><CloseIcon /></IconButton>
                </>
              ) : (
                <>
                  <Typography sx={{ mt: 1 }}>{student.bio}</Typography>
                  <IconButton onClick={() => startEditing("bio", student.bio)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Stack>

          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

