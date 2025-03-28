import React from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

const PageLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" toastOptions={{style: {
      background: '#ffff',
      color: '#975715',
    }}} />
      {/* Navbar */}
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="md:w-64 shrink-0">
          <Sidebar />
        </div>

        {/* Content Area */}
        <main className="flex-1 px-4 md:px-10">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
