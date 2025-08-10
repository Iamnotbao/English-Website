import { Card, Box, Stack } from "@mui/material";

export default function QuestionSkeleton() {
  return (
    <Card variant="outlined" sx={{ p: 1.5, opacity: 0.7 }}>
      <Box sx={{ height: 22, bgcolor: "grey.200", borderRadius: 1, width: "60%", mb: 1 }} />
      <Stack direction="row" gap={1}>
        <Box sx={{ height: 20, bgcolor: "grey.200", borderRadius: 1, width: 80 }} />
        <Box sx={{ height: 20, bgcolor: "grey.200", borderRadius: 1, width: 100 }} />
      </Stack>
    </Card>
  );
}