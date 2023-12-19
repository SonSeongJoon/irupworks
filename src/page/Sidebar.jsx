import React, {useEffect, useState} from 'react';
import { IoNewspaperOutline } from 'react-icons/io5';
import { CiYoutube } from 'react-icons/ci';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import SidebarContent from "../component/SidebarContent";
function SidebarItem({ isSidebarOpen, icon, text, to, closeSidebar, handleClick, isSelected }) {
   const navigate = useNavigate();

   const handleItemClick = () => {
      if (to) {
         navigate(to);
         closeSidebar();
         handleClick(text);
      }
   };
   const activeClass = isSelected
      ? `py-1 dark:bg-slate-700 text-gray-700 dark:text-white font-bold shadow-lg border-l-4 border-gray-800 rounded dark:border-slate-400 px-1}`
      : '';

   return (
      <Link to={to} className={`flex w-full items-center mb-[20px] ${activeClass}`} onClick={handleItemClick}>
         {icon && React.cloneElement(icon)}
         {isSidebarOpen && text && <div>{text}</div>}
      </Link>
   );
}

export default function Sidebar({ isSidebarOpen, closeSidebar }) {
   const location = useLocation();
   const [selectedContent, setSelectedContent] = useState('');

   useEffect(() => {
      const pathSegments = location.pathname.split('/').filter(segment => segment);
      if (pathSegments.length > 0) {
         setSelectedContent(pathSegments[0]);
      }
   }, [location]);

   const handleContentClick = (content) => {
      setSelectedContent(content);
      closeSidebar();
   };

   return (
      <div className='flex h-full'>
         <div
            className={`flex flex-col pt-5 px-3 h-full items-center dark:bg-slate-900 dark:text-slate-400 sm:drop-shadow-none border-r drop-shadow-[4px_4px_3px_rgba(0,0,0,0.15)] backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75 ${isSidebarOpen ? 'w-[190px]' : ''}`}>
            <SidebarItem
               isSidebarOpen={isSidebarOpen}
               icon={<IoNewspaperOutline size={24} className='mr-2 text-primary dark:text-slate-400'/>}
               text='뉴스 클리핑'
               to="/news"
               closeSidebar={closeSidebar}
               handleClick={() => handleContentClick('news')}
               isSelected={selectedContent === 'news'}
            />

            <SidebarItem
               isSidebarOpen={isSidebarOpen}
               icon={<CiYoutube size={24} className='mr-2 text-primary dark:text-slate-400'/>}
               text='유튜브 클리핑'
               to="/youtube"
               closeSidebar={closeSidebar}
               handleClick={() => handleContentClick('youtube')}
               isSelected={selectedContent === 'youtube'}

            />

            <SidebarItem
               isSidebarOpen={isSidebarOpen}
               icon={<LiaFileInvoiceDollarSolid size={24} className='mr-2 text-primary dark:text-slate-400'/>}
               text='리포트'
               to="/report"
               closeSidebar={closeSidebar}
               handleClick={() => handleContentClick('report')}
               isSelected={selectedContent === 'report'}
            />
         </div>
         <div>
            <SidebarContent selectedContent={selectedContent}/>
         </div>
      </div>
   );
}
