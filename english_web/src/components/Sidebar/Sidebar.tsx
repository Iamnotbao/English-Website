import { Link } from 'react-router-dom';
import style from './Sidebar.module.css';
const Sidebar =() => {
  return (
    <div className={style.sidebar}>
      <h2>Dashboard</h2>
      <ul>
        <Link to="/lesson"><li>Learn</li></Link>
        <Link to="/pronounciation"><li>Pronounciation</li></Link>
        <Link to="/flashcard"><li>Flash Card</li></Link>
        <Link to="/listening"><li>Listening</li></Link>
        <Link to="/help"><li>Q&A</li></Link>
        <Link to="/profile"><li>Profile</li></Link>
        <li><Link to="/login">Log Out</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
