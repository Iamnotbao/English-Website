import { useEffect, useState } from "react";
import LessonCard from "../../../components/Collection/LessonCard";
import styles from "../Lesson/Lesson.module.css"
import SwiperLesson from "../../../components/Swiper/Swiper";
import { GetListByUser } from "../../../service/UserService";
const Lesson = () => {
  const [lessons, setLessons] = useState([]);
  const user = localStorage.getItem("user");
  console.log("check lessons", lessons);

  if (user) {
    const userObj = JSON.parse(user);
    useEffect(() => {
      const fetchAllLesson = async () => {
        try {
          const response = await GetListByUser(userObj._id,userObj.access_token);
          if (response) {
            console.log("after get", response);
            setLessons(response.user_list);
          }
        } catch (error) {
          console.error("Failed to fetch lessons:", error);
        }
      };
      fetchAllLesson();
    }, []);
  }
  return (
    <div className={styles.lesson}>
      <h1>Learn Acivities</h1>
      <div className={styles.lesson_card}>
        <h1>Your Collections</h1>
        <hr></hr>
        <SwiperLesson lessons = {lessons} />
      </div>
      <div className={styles.lesson_card}>
        <h1>Recommmendation</h1>
        <hr></hr>
        {/* <LessonCard /> */}
      </div>
      <hr />

    </div>
  );
}
export default Lesson;