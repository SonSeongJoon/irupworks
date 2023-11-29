import React from 'react';

export default function NewsCard({ title, content, source, category, time, imageUrl }) {
  return (
     <div>
       <div className='py-3 flex-col justify-between'>
         <div className='flex-col'>
           <div className='flex text-sm mb-2'>
             <p className='mr-1 font-bold'>{source}</p>
             <p className='mr-1'>{category}</p>
             <p>{time}</p>
           </div>
           <div className='flex gap-5'>
             <div className='w-5/6'>
               <h2 className='text-xl dark:text-slate-200 mb-2 hover:underline cursor-pointer'>{title}</h2>
               <p className='text-sm'>{content}</p>
             </div>
             <div className='flex w-1/6 justify-end'>
               <img src={imageUrl} alt='이미지' className='w-[100px] h-[100px] object-cover bg-sky-50' />
             </div>
           </div>
         </div>
         <div>
           <hr className='border-t border-slate-400 dark:border-slate-600 mt-2 w-full' />
         </div>
       </div>
     </div>
  );
}
