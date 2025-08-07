import { Outlet } from 'react-router-dom';


const HomePage = () => {
  return (
    <div className="flex">
      ok
      <div className="flex-1">
        bar
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePage;