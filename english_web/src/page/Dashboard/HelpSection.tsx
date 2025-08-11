"use client";

import { useEffect, useState, useMemo } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import SortTabs from "../../components/HelpSection/SortTabs";
import TagFilter from "../../components/HelpSection/TagFilter";
import SearchBar from "../../components/HelpSection/SearchBar";
import QuestionCard from "../../components/HelpSection/QuestionCard";
import type { Question } from "../../model/Question";
import { CreatePost, GetAllPost, ToggleLike } from "../../service/PostService";
import QuestionForm from "../../components/HelpSection/QuestionForm";
import type { QuestionData } from "../../model/QuestionData";
import { useLocation } from "react-router-dom";
import ErrorPage from "../ErrorPage";

const  HelpSection=()=> {
  const [questions, setQuestions] = useState<(Question & { likes: string[] })[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"hot" | "new" | "top">("hot");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const location = useLocation();
  const user = localStorage.getItem("user");
  if (!user) return (<><ErrorPage/></>);
  const userObj = JSON.parse(user);
  const currentUserId = userObj._id;
  const fetchPosts = async () => {
    if (userObj) {
      const response = await GetAllPost(userObj.access_token);
      if (response) {
        console.log(response);
        setQuestions(response.posts);
      }
      else {
        console.log("There are no post at all ");
      }
    }
    else {
      console.log("user cannot be parsed to object!");
    }
  }
  useEffect(() => {
    fetchPosts();
  }, [location]);
  const tags = useMemo(() => {
    const s = new Set<string>();
    questions.forEach(q => q.tags.forEach(t => s.add(t)));
    return Array.from(s);
  }, [questions]);

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
        list = [...list].sort((a, b) => b.comments.length - a.comments.length);
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
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }
  const handleLikeToggle = async (questionId: string) => {
    try {
      if (userObj) {
        const response = await ToggleLike(questionId,userObj._id,userObj.access_token);
        if(response){
          console.log("after like:",response);  
          setQuestions(prev => prev.map(q=> q._id === questionId ? {...q,likes: response.post.likes}:q));  
        }
      }
      else{
        console.log("user has not been passed");
        
      }

    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (newPost: QuestionData) => {
    try {
      if (userObj) {
        const response = await CreatePost(newPost, userObj.access_token);
        setQuestions(prev => [...prev, response.post]);
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">List Of Questions</Typography>
        <Button variant="contained" onClick={handleOpen}>Ask Now</Button>
      </Stack>

      <Stack spacing={2} mb={2}>
        <SortTabs value={sort} onChange={setSort} />
        <SearchBar value={query} onChange={setQuery} />
        <TagFilter tags={tags} selectedTag={selectedTag} onSelect={setSelectedTag} />
      </Stack>

      <Stack spacing={1.5}>
        {filtered.slice(0, visibleCount).map(q => (
          <QuestionCard key={q._id} question={q} currentUserId={currentUserId} onVote={handleVote} onLikeToggle={handleLikeToggle} />
        ))}
      </Stack>

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
      <QuestionForm open={open} onClose={handleClose} onSubmit={handleSubmit} author_id={userObj._id} />
    </Box>
  );
}
export default HelpSection;