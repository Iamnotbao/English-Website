import { Link, useNavigate } from 'react-router-dom';
import style from './Sidebar.module.css';
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  }
  return (
    <div className={style.sidebar}>
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/lesson">Learn</Link></li>
        <li><Link to="/pronounciation">Pronunciation</Link></li>
        <li><Link to="/flashcard">Flash Card</Link></li>
        <li><Link to="/listening">Listening</Link></li>
        <li><Link to="/help">Q&A</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><span onClick={handleLogout} style={{cursor: 'pointer', color: 'white', textDecoration: 'none'}}>Log Out</span></li>
      </ul>
    </div>
  );
}

export default Sidebar;
