import React, { useState } from 'react';
import Header from "./page/Header";
import Sidebar from "./page/Sidebar";
import { Outlet } from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext";
import {DarkModeProvider} from "./context/DarkModeContext";

export default function App() {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const toggleSidebar = () => {
      setIsSidebarOpen((prev) => !prev);
   }

   const closeSidebar = () => {
      setIsSidebarOpen(false);
   }

   return (
      <AuthContextProvider>
         <DarkModeProvider>
         <div className='flex flex-col h-screen'>
            <header>
               <Header toggleSidebar={toggleSidebar} />
            </header>
            <div className='flex flex-grow dark:text-slate-400 flex-none transition-colors duration-500 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900'>
               <aside>
                  <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
               </aside>
               <main className="flex-grow overflow-y-auto max-h-[calc(100vh-4.2rem)]">
                  <Outlet />
               </main>
            </div>
         </div>
         </DarkModeProvider>
      </AuthContextProvider>

   );
}
