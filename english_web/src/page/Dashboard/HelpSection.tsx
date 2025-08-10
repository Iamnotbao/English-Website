"use client";

import { useEffect, useState, useMemo } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import SortTabs from "../../components/HelpSection/SortTabs";
import TagFilter from "../../components/HelpSection/TagFilter";
import SearchBar from "../../components/HelpSection/SearchBar";
import QuestionCard from "../../components/HelpSection/QuestionCard";
import type { Question } from "../../model/Question";



export default function HelpSection() {
  const [questions, setQuestions] = useState<(Question & { likes: string[] })[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"hot" | "new" | "top">("hot");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const currentUserId = "abc123";

  // Mock dữ liệu
  useEffect(() => {
    setQuestions([
      {
        _id: "1",
        title: "What is the difference between 'a' and 'an'?",
        tags: ["Grammar"],
        answersCount: 3,
        votes: 5,
        createdAt: "2025-08-10T08:00:00Z",
        likes: [],  // thêm đây
      },
      {
        _id: "2",
        title: "How to improve English speaking skills?",
        tags: ["Speaking"],
        answersCount: 5,
        votes: 8,
        createdAt: "2025-08-09T10:00:00Z",
        likes: [],
      },
      {
        _id: "3",
        title: "Best practices to expand Vocabulary quickly?",
        tags: ["Vocabulary"],
        answersCount: 4,
        votes: 12,
        createdAt: "2025-08-08T09:00:00Z",
        likes: [],
      },
      {
        _id: "4",
        title: "Common mistakes in English writing",
        tags: ["Grammar"],
        answersCount: 2,
        votes: 4,
        createdAt: "2025-08-07T14:00:00Z",
        likes: [],
      },
    ]);
  }, []);

  // Lấy danh sách tag
  const tags = useMemo(() => {
    const s = new Set<string>();
    questions.forEach(q => q.tags.forEach(t => s.add(t)));
    return Array.from(s);
  }, [questions]);

  // Lọc + sort
  const filtered = useMemo(() => {
    let list = questions
      .filter(q => q.title.toLowerCase().includes(query.toLowerCase()))
      .filter(q => !selectedTag || q.tags.includes(selectedTag));

    switch (sort) {
      case "new":
        list = [...list].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "top":
        list = [...list].sort((a, b) => b.votes - a.votes);
        break;
      case "hot":
        list = [...list].sort((a, b) => b.answersCount - a.answersCount);
        break;
    }
    return list;
  }, [questions, query, selectedTag, sort]);
  const handleVote = (id: string, change: number) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q._id === id) {
          const newVotes = q.votes + change;
          return {
            ...q,
            votes: newVotes < 0 ? 0 : newVotes,
          };
        }
        return q;
      })
    );
  };
  const handleLikeToggle = async (questionId: string, liked: boolean) => {
  // Gọi API backend để like/unlike post
  if (liked) {
    await fetch(`/api/posts/${questionId}/like`, { method: 'POST', body: JSON.stringify({ userId: currentUserId }) });
  } else {
    await fetch(`/api/posts/${questionId}/unlike`, { method: 'POST', body: JSON.stringify({ userId: currentUserId }) });
  }

  // Cập nhật local state để UI update nhanh
  setQuestions(prev =>
    prev.map(q =>
      q._id === questionId
        ? {
            ...q,
            likes: liked
              ? [...q.likes, currentUserId]
              : q.likes.filter(id => id !== currentUserId),
          }
        : q
    )
  );
};

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">List Of Questions</Typography>
        <Button variant="contained">Ask Now</Button>
      </Stack>

      {/* Controls */}
      <Stack spacing={2} mb={2}>
        <SortTabs value={sort} onChange={setSort} />
        <SearchBar value={query} onChange={setQuery} />
        <TagFilter tags={tags} selectedTag={selectedTag} onSelect={setSelectedTag} />
      </Stack>

      {/* Question List */}
      <Stack spacing={1.5}>
        {filtered.slice(0, visibleCount).map(q => (
          <QuestionCard key={q._id} question={q} currentUserId={currentUserId}  onVote={handleVote} onLikeToggle={handleLikeToggle} />
        ))}
      </Stack>

      {/* Load More */}
      {visibleCount < filtered.length && (
        <Stack alignItems="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => setVisibleCount(prev => prev + 5)}
          >
            Load More
          </Button>
        </Stack>
      )}
    </Box>
  );
}