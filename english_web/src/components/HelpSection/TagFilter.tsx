import { Stack, Chip } from "@mui/material";

export default function TagFilter({
  tags,
  selectedTag,
  onSelect,
}: {
  tags: string[];
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
}) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip
        label="All"
        clickable
        onClick={() => onSelect(null)}
        color={!selectedTag ? "primary" : "default"}
        size="small"
      />
      {tags.map(tag => (
        <Chip
          key={tag}
          label={tag}
          clickable
          onClick={() => onSelect(selectedTag === tag ? null : tag)}
          color={selectedTag === tag ? "primary" : "default"}
          size="small"
        />
      ))}
    </Stack>
  );
}
