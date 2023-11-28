import React from 'react';
import { IoNewspaperOutline } from 'react-icons/io5';
import { CiYoutube } from 'react-icons/ci';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';

function SidebarItem({ isSidebarOpen, icon, text, to, closeSidebar }) {
   const sidebarWidth = isSidebarOpen ? 'w-[190px]' : 'w-[40px]';
   const navigate = useNavigate();

   const handleItemClick = () => {
      if (to) {
         navigate(to);
         closeSidebar(); // 사이드바 항목 클릭 후 사이드바 닫기
      }
   };

   return (
      <Link to={to} className={`flex w-full items-center mb-[20px]  ${sidebarWidth}`} onClick={handleItemClick}>
         {icon && icon}
         {isSidebarOpen && text && <div>{text}</div>}
      </Link>
   );
}

export default function Sidebar({ isSidebarOpen, closeSidebar }) {
   return (
      <div className='flex flex-col pt-5 px-3 h-full items-center bg-white dark:bg-slate-900 dark:text-slate-400 sm:drop-shadow-none border-r drop-shadow-[4px_4px_3px_rgba(0,0,0,0.15)] backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75'>
         <SidebarItem
            isSidebarOpen={isSidebarOpen}
            icon={<IoNewspaperOutline size={32} className='mr-2 text-primary dark:text-slate-400' />}
            text='뉴스 클리핑'
            to="/news" // 이동할 경로를 지정
            closeSidebar={closeSidebar} // 사이드바 닫기 함수 전달
         />

         <SidebarItem
            isSidebarOpen={isSidebarOpen}
            icon={<CiYoutube size={32} className='mr-2 text-primary dark:text-slate-400' />}
            text='유튜브 클리핑'
            to="/youtube" // 이동할 경로를 지정
            closeSidebar={closeSidebar} // 사이드바 닫기 함수 전달
         />

         <SidebarItem
            isSidebarOpen={isSidebarOpen}
            icon={<LiaFileInvoiceDollarSolid size={32} className='mr-2 text-primary dark:text-slate-400' />}
            text='리포트'
            to="/report" // 이동할 경로를 지정
            closeSidebar={closeSidebar} // 사이드바 닫기 함수 전달
         />
      </div>
   );
}
