import React, { useState } from 'react';
import { IoNewspaperOutline } from 'react-icons/io5';
import { CiYoutube } from 'react-icons/ci';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import {useNavigate, Link} from 'react-router-dom';
import NewsHeader from "../component/news/NewsHeader";
import KeywordGroup from "../component/news/KeywordGroup";

function SidebarItem({ isSidebarOpen, icon, text, to, closeSidebar, handleClick }) {
   const navigate = useNavigate();

   const handleItemClick = () => {
      if (to) {
         navigate(to);
         closeSidebar();
         handleClick(text); // Call the handleClick function with the text
      }
   };

   return (
      <Link to={to} className={`flex w-full items-center mb-[20px]`} onClick={handleItemClick}>
         {icon && React.cloneElement(icon)}
         {isSidebarOpen && text && <div>{text}</div>}
      </Link>
   );
}

export default function Sidebar({ isSidebarOpen, closeSidebar }) {
   const [selectedContent, setSelectedContent] = useState('');
   console.log(selectedContent)

   const handleContentClick = (content) => {
      setSelectedContent(content);
      closeSidebar();
   };

   return (
      <div className='flex h-full'>
         <div
            className={`flex flex-col pt-5 px-3 h-full items-center bg-white dark:bg-slate-900 dark:text-slate-400 sm:drop-shadow-none border-r drop-shadow-[4px_4px_3px_rgba(0,0,0,0.15)] backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75 ${isSidebarOpen ? 'w-[190px]' : ''}`}>
            <SidebarItem
               isSidebarOpen={isSidebarOpen}
               icon={<IoNewspaperOutline size={24} className='mr-2 text-primary dark:text-slate-400'/>}
               text='뉴스 클리핑'
               to="/news"
               closeSidebar={closeSidebar}
               handleClick={() => handleContentClick('news')}
            />

            <SidebarItem
               isSidebarOpen={isSidebarOpen}
               icon={<CiYoutube size={24} className='mr-2 text-primary dark:text-slate-400'/>}
               text='유튜브 클리핑'
               to="/youtube"
               closeSidebar={closeSidebar}
               handleClick={() => handleContentClick('youtube')}
            />

            <SidebarItem
               isSidebarOpen={isSidebarOpen}
               icon={<LiaFileInvoiceDollarSolid size={24} className='mr-2 text-primary dark:text-slate-400'/>}
               text='리포트'
               to="/report"
               closeSidebar={closeSidebar}
               handleClick={() => handleContentClick('report')}
            />
         </div>
         {selectedContent === 'news' && (
            <div className='min-w-[250px] p-3 border-r border-slate-900/10 dark:border-slate-50/[0.06] select-none'>
               <div>
                  <NewsHeader/>
                  <KeywordGroup title='자사 뉴스'/>
                  <KeywordGroup title='경쟁사 뉴스'/>
                  <KeywordGroup title='이슈'/>
               </div>
            </div>
         )}
         {selectedContent === 'youtube' && (
            <div className='min-w-[250px] p-3 border-r border-slate-900/10 dark:border-slate-50/[0.06] select-none'>
               하이
            </div>
         )}
         {selectedContent === 'report' && (
            <div className='min-w-[250px] p-3 border-r border-slate-900/10 dark:border-slate-50/[0.06] select-none'>
               하이
            </div>
         )}
      </div>
   );
}
