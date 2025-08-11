import { Typography, Paper, Stack, Chip } from "@mui/material";
import type { User } from "../../model/User";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
type StudentProps = {
    student: Partial<User>;
};
export default function Achievements({ student }: StudentProps) {
    return (
        <Paper sx={{ p: 2, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6">
                <EmojiEventsIcon
                    sx={{ mr: 1, verticalAlign: "middle", color: "gold" }}
                />
                Achievements
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                {student.badges?.map((badge, i) => (
                    <Chip key={i} label={badge} color="warning" />
                ))}
            </Stack>
        </Paper>
    )
}


