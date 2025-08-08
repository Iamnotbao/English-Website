import { useEffect, useState } from "react";
import LessonCard from "../../../components/Collection/LessonCard";
import styles from "../Lesson/Lesson.module.css"
import { GetAllLesson } from "../../../service/LessonService";
const Lesson = () => {
  const [lesson, setLessons] = useState([]);
  useEffect(() => {
    const fetchAllLesson = async () => {
      try {
        const response = await GetAllLesson();
        if (response) {
          console.log("after get", response);
          setLessons(response);
        }
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      }
    };
    fetchAllLesson();
  }, []);
  return (
    <div className={styles.lesson}>
      <h1>Learn Acivities</h1>
      <div className={styles.lesson_card}>
        <h1>Your Collections</h1>
        <hr></hr>
        <LessonCard />
      </div>
      <div className={styles.lesson_card}>
        <h1>Recommmendation</h1>
        <hr></hr>
        <LessonCard />
      </div>
      <hr />

    </div>
  );
}
export default Lesson;