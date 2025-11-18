import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function () {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 mt-30">
        {/* 👇 This is where route content will appear */}
        <div id="main-content" className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
