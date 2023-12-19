import { CiFolderOn } from 'react-icons/ci';
import NewsCard from '../component/news/NewsCard';
import { GoChevronRight } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';
import MiniNewsCard from '../component/news/MiniNewsCard';
import { useKeywordContext } from '../context/KeywordContext';
import { useSelectedKeyword } from '../context/SelectKeywordContext';
import NoNewsMessage from "../component/news/NoNewsMessage";
export default function NewsPage() {
  const [loadedNewsData, setLoadedNewsData] = useState([]);
	console.log(loadedNewsData)
  const { Keyword } = useKeywordContext();
  const { selectedKeyword } = useSelectedKeyword();

  useEffect(() => {
    if (Keyword) {
      fetchNewsByKeyword(Keyword);
    }
  }, [Keyword]);

	const fetchNewsByKeyword = (keyword) => {
		const formattedKeyword = keyword.replace(/\s+/g, '');
		const word = encodeURIComponent(formattedKeyword);
		fetch(`http://localhost:5000/api/news/${word}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error('데이터를 불러오는데 실패했습니다.');
			}
			return response.json();
		})
		.then((data) => {
			if (data === null) {
				setLoadedNewsData(null);
			} else {
				setLoadedNewsData(data);
			}
		})
		.catch((error) => {
			console.error('데이터 로딩 중 에러 발생:', error);
		});
	};


	return (
    <div className='flex h-full overflow-x-hidden'>
      <div className='flex w-full h-full border-r p-5 justify-center border-slate-900/10 dark:border-slate-50/[0.06] select-none'>
        <div className='max-w-[750px] min-w-[750px] flex-col'>
          <div className='flex items-center mb-2'>
            <CiFolderOn size={24} className='mr-2' />
            <h1 className='text-xl font-semibold'>
              {selectedKeyword.groupname}
            </h1>
          </div>
          <div className='border rounded-md inline-block px-2 py-1 border-0.5 bg-red-600 text-sm text-white dark:text-slate-400 dark:bg-slate-800 dark:border-0.5 dark:border-slate-500'>
            <p>‘제목’ 에서 ‘서울IR’을(를) 포함한 검색 결과입니다.</p>
          </div>
          {loadedNewsData === null || loadedNewsData.length === 0 ? (
            <NoNewsMessage/>
          ) : (
            loadedNewsData.map((news, index) => (
              <NewsCard
                key={index}
                title={news.title}
                content={news.content}
                press={news.press}
                category={news.category}
                date={news.date}
                img={news.img}
                address_url={news.address_url}
              />
            ))
          )}
        </div>
      </div>
      <div className='max-w-[400px] min-w-[300px] p-5'>
        <div className='flex items-center justify-between '>
          <div className='flex items-center'>
            <h2>스크랩 뉴스</h2>
            <GoChevronRight size={20} />
          </div>
          <button className='text-xm border border-slate-400 rounded-lg bg-gray-50 dark:bg-slate-900 px-2 py-1'>
            브리핑 만들기
          </button>
        </div>
        <div className='flex items-center text-sm'>
          <p className='mr-1'>오늘</p>
          <BsCaretDownFill />
        </div>
        <div className='p-3 '>
          {loadedNewsData && loadedNewsData.map((news, index) => (
            <MiniNewsCard
              key={index}
              title={news.title}
              source={news.press}
              date={news.date}
              tags={news.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
