import {CiFolderOn} from 'react-icons/ci';
import NewsCard from '../component/news/NewsCard';
import {GoChevronRight} from 'react-icons/go';
import newsData from '../component/news/newsData.json';
import {useEffect, useState} from "react";

export default function NewsPage() {
   const [loadedNewsData, setLoadedNewsData] = useState([]);
   useEffect(() => {
      // Simulate loading the data from the imported JSON file
      setLoadedNewsData(newsData);
   }, []);

   return (
      <div className='flex p-5'>
         <div className='flex w-full h-full'>
            <div className='max-w-[1000px] min-w-[600px] flex-col  p-3'>
               <div className='flex items-center mb-2'>
                  <CiFolderOn size={24} className='mr-2'/>
                  <h1 className='text-xl font-semibold'>자사 뉴스</h1>
               </div>
               <div
                  className='border rounded-md inline-block px-2 py-1 border-0.5 bg-red-600 text-sm text-white dark:text-slate-400 dark:bg-slate-800 dark:border-0.5 dark:border-slate-500'>
                  <p>‘제목 및 본문’ 에서 ‘서울IR’을(를) 포함한 검색 결과입니다.</p>
               </div>
               {/* Map over the loadedNewsData array to render NewsCard components */}
               {loadedNewsData.map((news, index) => (
                  <NewsCard
                     key={index} // Make sure to use a unique key for each card
                     title={news.title}
                     content={news.content}
                     source={news.source}
                     category={news.category}
                     time={news.time}
                     imageUrl={news.imageUrl}
                  />
               ))}
            </div>
         </div>
         <div className='max-w-[400px] min-w-[300px]'>
            <div className='flex items-center justify-between p-3'>
               <div className='flex items-center'>
                  <h2>스크랩 뉴스</h2>
                  <GoChevronRight size={20}/>
               </div>
               <button className='text-xm border border-slate-400 rounded-lg bg-gray-50 dark:bg-slate-900 px-2 py-1'>
                  브리핑 만들기
               </button>
            </div>
         </div>
      </div>
   );
}
