import React from 'react';
import NewsSidebar from "./news/NewsSideBar";

export default function SidebarContent({ selectedContent }) {
  return (
    <div className='h-full'>
      {selectedContent === 'news' && <NewsSidebar />}
      {selectedContent === 'youtube' && (
        <div className='min-w-[250px] h-full  p-3 border-r border-slate-900/10 dark:border-slate-50/[0.06] select-none'>
          하이
        </div>
      )}
      {selectedContent === 'report' && (
        <div className='min-w-[250px] h-full  p-3 border-r border-slate-900/10 dark:border-slate-50/[0.06] select-none'>
          하이
        </div>
      )}
    </div>
  );
}
