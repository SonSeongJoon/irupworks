import React, { createContext, useContext, useState } from 'react';

const SelectedKeywordContext = createContext();

export const SelectedGroupProvider = ({ children }) => {
  const [selectedGroup, setSelectedGroup] = useState('');

  const setGroup = (keyword) => {
    setSelectedGroup(keyword);
  };

  return (
    <SelectedKeywordContext.Provider
      value={{ selectedGroup, setGroup }}
    >
      {children}
    </SelectedKeywordContext.Provider>
  );
};

export const useSelectedGroup = () => {
  return useContext(SelectedKeywordContext);
};
