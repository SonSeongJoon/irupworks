import React, { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // 다크 모드 상태를 업데이트하고 localStorage에 저장하는 함수
  const updateDarkMode = (isDark) => {
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleDarkMode = () => {
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' ||
       (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    updateDarkMode(isDark);
  }, []);

  return (
     <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
       {children}
     </DarkModeContext.Provider>
  );
};

export function useDarkModeContext() {
  return useContext(DarkModeContext);
}
