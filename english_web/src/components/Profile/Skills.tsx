import { Paper, Typography, Stack, IconButton, TextField, LinearProgress, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import type { User } from "../../model/User";
import { useState } from "react";

type SkillsProps = {
  student: Partial<User>;
  onChange: (changes: Partial<User>) => void;
};

export default function Skills({ student, onChange }: SkillsProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [tempSkill, setTempSkill] = useState<{ name: string; progress: number }>({ name: "", progress: 0 });

  const startEditing = (index: number) => {
    const skill = student.skills?.[index];
    setTempSkill({ name: skill?.name || "", progress: skill?.progress || 0 });
    setEditIndex(index);
  };

  const saveChange = () => {
    if (editIndex === null) return;
    const newSkills = [...(student.skills || [])];
    newSkills[editIndex] = { ...tempSkill };
    onChange({ skills: newSkills });
    setEditIndex(null);
  };

  const cancelChange = () => {
    setEditIndex(null);
  };

  return (
    <Paper sx={{ p: 2, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Skill Progress
      </Typography>

      {(student.skills || []).map((skill, index) => (
        <Stack key={index} direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          {editIndex === index ? (
            <>
              <TextField
                size="small"
                label="Skill"
                value={tempSkill.name}
                onChange={(e) => setTempSkill((s) => ({ ...s, name: e.target.value }))}
                sx={{ flexGrow: 1 }}
                autoFocus
              />
              <TextField
                size="small"
                label="Progress"
                type="number"
                inputProps={{ min: 0, max: 100 }}
                value={tempSkill.progress}
                onChange={(e) => setTempSkill((s) => ({ ...s, progress: Number(e.target.value) }))}
                sx={{ width: 80 }}
              />
              <IconButton onClick={saveChange} size="small">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={cancelChange} size="small">
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight="bold">{skill.name}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={skill.progress}
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </Box>
              <IconButton onClick={() => startEditing(index)} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Stack>
      ))}
    </Paper>
  );
}
