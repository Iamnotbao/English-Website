import { useEffect, useState } from "react";
import styles from "../Lesson/Lesson.module.css"
import SwiperLesson from "../../../components/Swiper/Swiper";
import { DeleteLessonByUser, GetListByUser } from "../../../service/UserService";
import { Button } from "@mui/material";
import { CreateLesson, DeleteLesson } from "../../../service/LessonService"
import AddLesson from "../../../components/Dialog/AddLesson";
import type { LessonData } from "../../../model/LessonData";
const Lesson = () => {
  const [lessons, setLessons] = useState([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [userObj, setUserObj] = useState<{ _id: string; access_token: string } | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(file));
    }
  }
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
    console.log("hi", formData);

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
    if (id) {
      if (!userObj) return;
      try {
        await DeleteLessonByUser(userObj._id, id, userObj.access_token);
        await fetchAllLesson();
      } catch (error: any) {
        console.log(error);
      }
    }
    else {
      console.log("the id has not been passed! ");
    }
  }
  return (
    <div className={styles.lesson}>
      <h1>Learn Activities</h1>
      <div className={styles.lesson_card}>
        <h1>Your Collections</h1>
        <hr></hr>
        <SwiperLesson lessons={lessons} handleDelete={handleDelete} />
      </div>
      <div className={styles.lesson_card}>
        <h1>Recommmendation</h1>
        <hr></hr>
      </div>
      <hr />
      <div className={styles.button}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{ minWidth: 10, minHeight: 10, borderRadius: "50%", fontSize: 16 }}
        >
          +
        </Button>
        <AddLesson open={open} handleClose={handleClose} onCreate={handleCreateLesson} handleFile={handleFileChange} />
      </div>
    </div>
  );
}
export default Lesson;