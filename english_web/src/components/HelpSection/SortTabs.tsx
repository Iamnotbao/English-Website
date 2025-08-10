import { Tabs, Tab } from "@mui/material";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";

export default function SortTabs({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: "hot" | "new" | "top") => void;
}) {
  return (
    <Tabs value={value} onChange={(_, v) => onChange(v)}>
      <Tab icon={<WhatshotOutlinedIcon fontSize="small" />} iconPosition="start" value="hot" label="Hot" />
      <Tab icon={<NewReleasesOutlinedIcon fontSize="small" />} iconPosition="start" value="new" label="New" />
      <Tab icon={<LeaderboardOutlinedIcon fontSize="small" />} iconPosition="start" value="top" label="Top" />
    </Tabs>
  );
}
