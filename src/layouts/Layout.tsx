import logocard from "@/assets/logocard.svg";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-primary-normal flex flex-row gap-2">
        <Link to="/" className="flex flex-row gap-1">
          <img src={logocard} alt="logo" className="w-8" />
          <h1 className="text-2xl font-bold text-white">Flash Cards</h1>
        </Link>
      </header>
      <main className="p-2 flex flex-col items-center justify-center flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
