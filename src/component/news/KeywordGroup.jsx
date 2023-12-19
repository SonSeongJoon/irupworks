import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BsCaretDownFill, BsCaretRightFill, BsThreeDots } from 'react-icons/bs';
import { CiFolderOn } from 'react-icons/ci';
import { GoPlus } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useKeywordContext } from '../../context/KeywordContext';

export default function KeywordGroup({
  groupname,
  groupid,
  uid,
  isSelected,
  onClick,
  onEdit,
  onRemove,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keywords, setKeywords] = useState([]); // 키워드를 저장할 상태 변수
  const { setKeyword } = useKeywordContext(); // Context에서 setKeyword 함수 가져오기

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleTitleClick = (keyword) => {
    onClick(keyword.word);
    navigate(`/news/${groupname}`);
  };

  const handleKeywordClick = (keyword) => {
    setKeyword(keyword.word);
    navigate(`/news/${groupid}/${keyword.keywordid}`);
  };

  const handleRemoveClick = () => {
    setIsMenuOpen(false);
    openModal();
  };

  const confirmDelete = () => {
    onRemove();
    closeModal();
  };

  const fetchKeywordData = useCallback(() => {
    if (uid && groupname) {
      fetch(`http://localhost:5000/api/keyword/${uid}/${groupname}`, {
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setKeywords(data);
        })
        .catch((error) => {
          console.error('Error fetching keyword group:', error);
        });
    }
  }, [uid, groupname]);

  useEffect(() => {
    fetchKeywordData();
  }, [uid, groupname, fetchKeywordData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className='mb-3 group' ref={menuRef}>
      <div
        className={`cursor-pointer flex py-1 rounded-lg items-center justify-between ${
          isSelected ? 'bg-blue-50 dark:bg-slate-800 shadow-md' : ''
        }`}
        onClick={onClick}
      >
        <div className='flex items-center'>
          {isDropdownOpen ? (
            <BsCaretDownFill
              size={12}
              className='ml-1 mr-2 cursor-pointer'
              onClick={toggleDropdown}
            />
          ) : (
            <BsCaretRightFill
              size={12}
              className='ml-1 mr-2 cursor-pointer'
              onClick={toggleDropdown}
            />
          )}
          <div className='flex' onClick={handleTitleClick}>
            <CiFolderOn size={24} className='mr-1' />
            <h2 className='text-md'>{groupname}</h2>
          </div>
        </div>
        <div className='flex'>
          <div>
            <BsThreeDots
              className='mr-1 cursor-pointer text-slate-500'
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <div
                className={`absolute mt-1 py-1 w-48 bg-white rounded-md shadow-lg z-10 ${
                  isMenuOpen ? 'opacity-100' : ''
                }`}
              >
                <p
                  className='text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer dark:text-slate-600'
                  onClick={onEdit}
                >
                  그룹명 수정
                </p>
                <p
                  className='text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer dark:text-slate-600'
                  onClick={handleRemoveClick}
                >
                  그룹 삭제
                </p>
              </div>
            )}

            {isModalOpen && (
              <div className='fixed inset-0 flex bg-black bg-opacity-10 justify-center items-center'>
                <div className='bg-white p-4 rounded-lg shadow-xl'>
                  <p className='text-lg font-bold mb-4'>
                    '{groupname}' 그룹 삭제
                  </p>
                  <p className='text-lg'>
                    해당 뉴스 그룹을 삭제하면 키워드도 함께 삭제됩니다.
                  </p>
                  <p className='text-lg mb-5'>그래도 삭제하시겠습니까?</p>
                  <div className='flex justify-end'>
                    <button
                      className='bg-red-500 text-white px-4 py-2 rounded mr-2'
                      onClick={confirmDelete}
                    >
                      확인
                    </button>
                    <button
                      className='bg-gray-300 px-4 py-2 rounded'
                      onClick={closeModal}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <GoPlus className='mr-1 text-slate-500' />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-max-h ease-in-out duration-300 ${
          isDropdownOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className='px-6 py-1'>
          {keywords.map((keyword, index) => (
            <p
              key={index}
              className='text-sm mb-1 cursor-pointer'
              onClick={() => handleKeywordClick(keyword)}
            >
              #{keyword.word}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}