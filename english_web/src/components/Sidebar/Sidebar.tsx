import { NavLink, useNavigate } from 'react-router-dom';
import style from './Sidebar.module.css';
import { Avatar } from '@mui/material';

const Sidebar = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;
  console.log("check",userObj);
  

  const handleLogout = () => {
    localStorage.removeItem("user");
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
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <i className="fa-solid fa-chalkboard" style={{ fontSize: "24px" }}></i>
            Learn
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/pronounciation"
            className={({ isActive }) => isActive ? style.active : ""}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <i className="fa-solid fa-volume-high" style={{ fontSize: "24px" }}></i>
            Pronunciation
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/flashcard"
            className={({ isActive }) => isActive ? style.active : ""}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <i className="fa-solid fa-layer-group" style={{ fontSize: "24px" }}></i>
            Flash Card
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/listening"
            className={({ isActive }) => isActive ? style.active : ""}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <i className="fa-solid fa-headphones" style={{ fontSize: "24px" }}></i>
            Listening
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/help"
            className={({ isActive }) => isActive ? style.active : ""}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <i className="fa-solid fa-comments" style={{ fontSize: "24px" }}></i>
            Q&A
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => isActive ? style.active : ""}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Avatar
              src={userObj?.avatar || ""}
              alt={userObj?.name || "User"}
              sx={{ width: 32, height: 32 }}
            />
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
