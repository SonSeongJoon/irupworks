import React, { useCallback, useEffect, useState } from 'react';
import NewsHeader from './NewsHeader';
import KeywordGroup from './KeywordGroup';
import { useNavigate } from 'react-router-dom';
import { useSelectedKeyword } from '../../context/SelectKeywordContext';
import { useAuthContext } from '../../context/AuthContext';

export default function NewsSidebar() {
  const navigate = useNavigate();
  const { selectedKeyword, setSelectedKeyword } = useSelectedKeyword();
  const [keywordData, setKeywordData] = useState([]);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedKeyword.groupid) {
      navigate(`/news/${selectedKeyword.groupid}`);
    }
  }, [selectedKeyword, navigate]);

  const fetchKeywordData = useCallback(() => {
    if (!user || !user?.uid) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetch(`http://localhost:5000/api/keywordGroup/${user.uid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setKeywordData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching keyword groups:', error);
        setIsLoading(false);
      });
  }, [user]);

  useEffect(() => {
    fetchKeywordData();
  }, [fetchKeywordData]);

  const handleRemoveGroup = (groupName) => {
    fetch(`http://localhost:5000/api/removeGroup/${user.uid}/${groupName}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        fetchKeywordData();
      })
      .catch((error) => {
        console.error('Error removing keyword group:', error);
      });
  };

  const handleTitleClick = (keyword) => {
    setSelectedKeyword(keyword);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-full min-w-[250px] p-3 border-r border-slate-900/10 dark:border-slate-50/[0.06] select-none'>
      <div>
        <NewsHeader />
        {keywordData.map((keyword, index) => (
          <KeywordGroup
            key={index}
            groupname={keyword.groupname}
            groupid={keyword.groupid}
            uid={user.uid}
            isSelected={keyword.groupid === selectedKeyword.groupid}
            onClick={() => handleTitleClick(keyword)}
            onRemove={() => handleRemoveGroup(keyword.groupname)}
          />
        ))}
      </div>
    </div>
  );
}
