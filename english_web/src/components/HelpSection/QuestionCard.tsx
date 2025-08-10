import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material';
import type { Question } from '../../model/Question';
import { useNavigate } from 'react-router-dom';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

type QuestionCardProps = {
  question: Question & { likes: string[] };
  currentUserId: string;
  onVote: (id: string, change: number) => void;
  onLikeToggle: (id: string, liked: boolean) => void;
};

export default function QuestionCard({ question, currentUserId, onVote, onLikeToggle }: QuestionCardProps) {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/help/${question._id}`);
  };

  const liked = question.likes.includes(currentUserId);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeToggle(question._id, !liked);
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 1, display: 'flex', cursor: 'pointer' }} onClick={goToDetail}>
      {/* Voting controls on the left */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 1,
          bgcolor: 'background.default',
          borderRadius: 2,
          minWidth: 60,
          userSelect: 'none',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Vote up */}
        <IconButton
          size="small"
          color="primary"
          aria-label="Upvote"
          onClick={() => onVote(question._id, +1)}
        >
          <ThumbUpAltOutlinedIcon />
        </IconButton>

        <Typography variant="subtitle1" fontWeight="bold" color="text.primary" sx={{ my: 0.5 }}>
          {question.votes}
        </Typography>

        {/* Vote down */}
        <IconButton
          size="small"
          color="secondary"
          aria-label="Downvote"
          onClick={() => onVote(question._id, -1)}
        >
          <ThumbDownAltOutlinedIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {question.title}
        </Typography>

        <Stack direction="row" spacing={1} mt={1} mb={1}>
          {question.tags.map(tag => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Stack>

        {/* Câu trả lời + trái tim nằm ngang */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {question.answersCount} câu trả lời
          </Typography>

          {/* Like button + số lượt thích */}
          <IconButton
            size="small"
            color={liked ? 'error' : 'default'}
            aria-label="Like"
            onClick={handleLikeClick}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2" color="text.secondary" sx={{ userSelect: 'none' }}>
            {question.likes.length}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
