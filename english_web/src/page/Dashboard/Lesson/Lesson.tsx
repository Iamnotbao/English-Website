import { useEffect, useState } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import SwiperLesson from "../../../components/Swiper/Swiper";
import { DeleteLessonByUser, GetListByUser } from "../../../service/UserService";
import { CreateLesson } from "../../../service/LessonService";
import AddLesson from "../../../components/Dialog/AddLesson";
import type { LessonData } from "../../../model/LessonData";

const Lesson = () => {
  const [lessons, setLessons] = useState([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [userObj, setUserObj] = useState<{ _id: string; access_token: string } | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const fetchAllLesson = async () => {
    const user = localStorage.getItem("user");
    if (!user) return;
    try {
      const parsedUser = JSON.parse(user);
      setUserObj(parsedUser);

      const response = await GetListByUser(parsedUser._id, parsedUser.access_token);
      if (response) {
        setLessons(response.user_list);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllLesson();
  }, []);

  const handleCreateLesson = async (newLesson: LessonData) => {
    if (!userObj) return;
    const formData = new FormData();
    formData.append("name", newLesson.name);
    formData.append("level", newLesson.level);
    formData.append("rating", newLesson.rating.toString());
    formData.append("words", JSON.stringify(newLesson.words));
    if (imageFile) {
      formData.append("image_url", imageFile);
    }
    try {
      const response = await CreateLesson(userObj._id, formData, userObj.access_token);
      if (response) {
        await fetchAllLesson();
        handleClose();
      }
    } catch (error) {
      console.error("Failed to create lesson:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id || !userObj) return;
    try {
      await DeleteLessonByUser(userObj._id, id, userObj.access_token);
      await fetchAllLesson();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box p={3} position="relative">
      <Typography variant="h4" gutterBottom>
        Learn Activities
      </Typography>
      <Box
        p={2}
        mb={3}
        borderRadius={2}
        boxShadow={2}
        bgcolor="background.paper"
      >
        <Typography variant="h5" gutterBottom>
          Your Collections
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <SwiperLesson lessons={lessons} handleDelete={handleDelete} />
      </Box>

      <Box
        p={2}
        mb={3}
        borderRadius={2}
        boxShadow={2}
        bgcolor="background.paper"
      >
        <Typography variant="h5" gutterBottom>
          Recommendation
        </Typography>
        <Divider />
      </Box>
      <Box position="absolute" top={10} right={30}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{
            minWidth: 10,
            minHeight: 10,
            borderRadius: "50%",
            fontSize: 16,
          }}
        >
          +
        </Button>
      </Box>
      <AddLesson
        open={open}
        handleClose={handleClose}
        onCreate={handleCreateLesson}
        handleFile={handleFileChange}
      />
    </Box>
  );
};

export default Lesson;
