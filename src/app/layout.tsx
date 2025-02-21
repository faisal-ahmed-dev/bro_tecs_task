import React from "react";
import "./globals.css";
import Sidebar from "../components/Sidebar/Sidebar";
import TopNav from "../components/TopNav";
import { ThemeProvider } from "next-themes";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="flex h-screen ">
        <ThemeProvider attribute="class">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <TopNav />
            <main className="flex-1 p-4 overflow-auto">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
