import { FC } from "react";
import { LayoutFooter } from "@/widgets";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-gray-900 dark:via-gray-900/90 dark:to-blue-900/20 transition-all duration-500">
      <main className="animate-fade-in">
        <Outlet />
      </main>
      <LayoutFooter />
    </div>
  );
};

export default Layout;
