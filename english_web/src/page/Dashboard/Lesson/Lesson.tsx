import { useEffect, useState } from "react";
import styles from "../Lesson/Lesson.module.css"
import SwiperLesson from "../../../components/Swiper/Swiper";
import { GetListByUser } from "../../../service/UserService";
import { Button } from "@mui/material";
import { CreateLesson } from "../../../service/LessonService"
import AddLesson from "../../../components/Dialog/AddLesson";
import type { LessonData } from "../../../model/LessonData";
const Lesson = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userObj, setUserObj] = useState<{ _id: string; access_token: string } | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchAllLesson = async () => {
    const user = localStorage.getItem("user");
    if (!user) return;
    try {
      const parsedUser = JSON.parse(user);
      setUserObj(parsedUser);

      const response = await GetListByUser(parsedUser._id, parsedUser.access_token);
      if (response) {
        setLessons(response.user_list);
        setLoading(true);
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
    try {
      const response = await CreateLesson(userObj._id, newLesson, userObj.access_token);
      if (response) {
        await fetchAllLesson();
        handleClose();
      }
    } catch (error) {
      console.error("Failed to create lesson:", error);
    }
  };
  return (
    <div className={styles.lesson}>
      <h1>Learn Activities</h1>
      <div className={styles.lesson_card}>
        <h1>Your Collections</h1>
        <hr></hr>
        <SwiperLesson lessons={lessons} />
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
        <AddLesson open={open} handleClose={handleClose} onCreate={handleCreateLesson} />
      </div>
    </div>
  );
}
export default Lesson;