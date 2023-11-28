import React, {useEffect, useRef, useState} from 'react';
import { BsCaretDownFill, BsFillPeopleFill } from 'react-icons/bs';
import { FaMoon, FaSun } from 'react-icons/fa'; // 다크 모드/라이트 모드 아이콘
import { MdLogout } from 'react-icons/md'; // 로그아웃 아이콘
import { useDarkModeContext } from "../context/DarkModeContext";

export default function AccountLogin({ handleLogout }) {
   const [showDropdown, setShowDropdown] = useState(false);
   const { darkMode, toggleDarkMode } = useDarkModeContext();
   const dropdownRef = useRef(null);

   const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
   };

   useEffect(() => {
      // 외부 클릭을 감지하는 함수
      function handleClickOutside(event) {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
         }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [dropdownRef]);

   return (
      <div className="relative" ref={dropdownRef}>
         <div className='flex w-[130px] h-[50px] shadow-lg text-sm rounded-xl items-center justify-center mr-[20px] bg-gray-100 border border-gray-300 cursor-pointer dark:bg-slate-900 dark:border-slate-400 transition-colors duration-500' onClick={toggleDropdown}>
            <BsFillPeopleFill size={24} className='mr-[12px] dark:text-slate-400 ' />
            <p className='mr-[10px] dark:text-slate-400'>손성준</p>
            <BsCaretDownFill className='dark:text-slate-400'/>
         </div>
         {showDropdown && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
               <button
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={handleLogout}
               >
                  <MdLogout className="mr-2" />로그아웃하기
               </button>
               <button
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={toggleDarkMode}
               >
                  {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
                  {darkMode ? '라이트 모드' : '다크 모드'}
               </button>
            </div>
         )}
      </div>
   );
}
