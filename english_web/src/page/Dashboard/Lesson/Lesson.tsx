import LessonCard from "../../../components/Collection/LessonCard";
import styles from "../Lesson/Lesson.module.css"
const Lesson = () => {
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