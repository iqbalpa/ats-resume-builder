import { FC } from "react";
import { LayoutFooter, LayoutHeader } from "@/widgets";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="h-screen overflow-x-hidden bg-white dark:bg-gray-900 transition-colors duration-200">
      <LayoutHeader />
      <main>
        <Outlet />
      </main>
      <LayoutFooter />
    </div>
  );
};

export default Layout;
