import { NavLink, useNavigate } from 'react-router-dom';
import style from './Sidebar.module.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <div className={style.sidebar}>
      <h2>Bamblebee</h2>
      <ul>
        <li>
          <NavLink 
            to="/lesson" 
            className={({ isActive }) => isActive ? style.active : ""}
            end
          >
            Learn
          </NavLink>
        </li>
        <li>
          <NavLink to="/pronounciation" className={({ isActive }) => isActive ? style.active : ""}>
            Pronunciation
          </NavLink>
        </li>
        <li>
          <NavLink to="/flashcard" className={({ isActive }) => isActive ? style.active : ""}>
            Flash Card
          </NavLink>
        </li>
        <li>
          <NavLink to="/listening" className={({ isActive }) => isActive ? style.active : ""}>
            Listening
          </NavLink>
        </li>
        <li>
          <NavLink to="/help" className={({ isActive }) => isActive ? style.active : ""}>
            Q&A
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? style.active : ""}>
            Profile
          </NavLink>
        </li>
        <li>
          <span 
            onClick={handleLogout} 
            style={{ cursor: 'pointer' }}
          >
            Log Out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
