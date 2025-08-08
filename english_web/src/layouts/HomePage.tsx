import { Outlet } from 'react-router-dom';
import SideBar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <>
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-2 bg-gray-100 p-4">
          <SideBar />
        </div>
        <main className="col-span-10 p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
