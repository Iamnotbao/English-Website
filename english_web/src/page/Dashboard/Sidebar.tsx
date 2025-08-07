const SideBar =() => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/notifications">Notifications</a></li>
        <li><a href="/help">Help</a></li>
      </ul>
    </div>
  );
}

export default SideBar;
