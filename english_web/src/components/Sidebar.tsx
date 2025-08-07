const Sidebar =() => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><a href="/lesson">Learn</a></li>
        <li><a href="/pronounciation">Pronounciation</a></li>
        <li><a href="/flashcard">Flash Card</a></li>
        <li><a href="/listening">Listening</a></li>
        <li><a href="/help">Q&A</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/logout">Log Out</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
