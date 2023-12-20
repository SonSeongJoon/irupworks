import { CiFolderOn } from 'react-icons/ci';
import NewsCard from '../component/news/NewsCard';
import { GoChevronRight } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';
import MiniNewsCard from '../component/news/MiniNewsCard';
import NoNewsMessage from '../component/news/NoNewsMessage';
import '../global.css';
import { useAuthContext } from '../context/AuthContext';
import {useLocation} from "react-router-dom";

export default function NewsPage() {
  const [loadedNewsData, setLoadedNewsData] = useState([]);
  const [groupName, setGroupName] = useState('');
  const { user } = useAuthContext();
  const location = useLocation();
  const path = String(location.pathname);
  const pathSegments = path.split('/');
  const keywordid = pathSegments[3]
  const groupid = pathSegments[2];

  useEffect(() => {
    const fetchNewsByGroupName = (groupid) => {
      fetch(`http://localhost:5000/api/group/${user.uid}/${groupid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        if (data === null) {
          setGroupName('');
        } else {
          const firstGroupName = data[0].groupname;
          setGroupName(firstGroupName);
        }
      })
      .catch((error) => {
        console.error('데이터 로딩 중 에러 발생:', error);
      });
    };

    if (groupid !== null) {
      fetchNewsByGroupName(groupid);
    }
  }, [groupid, user.uid]);


  useEffect(() => {
    if (keywordid !== undefined) {
      const fetchNewsByKeyword = (keywordid) => {
        fetch(`http://localhost:5000/api/news/${user.uid}/${keywordid}`)
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
      fetchNewsByKeyword(keywordid);
    } else {
      const fetchNewsByGroup = (groupid) => {
        fetch(`http://localhost:5000/api/groupNewsSearch/${user.uid}/${groupid}`)
        .then((response) => {
          if(!response.ok) {
            throw new Error('데이터를 불러오는데 실패했습니다.');
          }
          return response.json();
        })
        .then((data) => {
          if(data === null) {
            setLoadedNewsData(null);
          } else {
            setLoadedNewsData(data);
          }
        })
        .catch((error) => {
          console.error('데이터 로딩 중 에러 발생:', error);
        });
      }
      fetchNewsByGroup(groupid)
    }
  }, [keywordid, user.uid, groupid]);





  return (
    <div className='flex p-5 h-full'>
      <div className='max-w-[900px] min-w-[900px] flex justify-center '>
        <div className='max-w-[700px] min-w-[700px] flex-col p-3 '>
          <div className='flex items-center mb-2'>
            <CiFolderOn size={24} className='mr-2' />
            <h1 className='text-xl font-semibold'>
              {groupName}
            </h1>
          </div>
          <div className='border rounded-md inline-block px-2 py-1 border-0.5 bg-red-600 text-sm text-white dark:text-slate-400 dark:bg-slate-800 dark:border-0.5 dark:border-slate-500'>
            <p>‘제목’ 에서 ‘서울IR’을(를) 포함한 검색 결과입니다.</p>
          </div>
          {loadedNewsData === null || loadedNewsData.length === 0 ? (
            <NoNewsMessage />
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
      <div className='max-w-[400px] min-w-[300px]'>
        <div className='flex items-center justify-between p-3'>
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
        <div className='p-3'>
          {loadedNewsData &&
            loadedNewsData.map((news, index) => (
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
