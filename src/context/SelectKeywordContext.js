import React, { useState, createContext, useContext, useEffect } from 'react';

const SelectedKeywordContext = createContext();

export const SelectedKeywordProvider = ({ children }) => {
	const [selectedKeyword, setSelectedKeyword] = useState('');

	useEffect(() => {
		const savedKeyword = localStorage.getItem('selectedKeyword');
		if (savedKeyword) {
			setSelectedKeyword(savedKeyword);
		}
	}, []);

	useEffect(() => {
		if (selectedKeyword) {
			localStorage.setItem('selectedKeyword', selectedKeyword);
		}
	}, [selectedKeyword]);

	return (
		<SelectedKeywordContext.Provider value={{ selectedKeyword, setSelectedKeyword }}>
			{children}
		</SelectedKeywordContext.Provider>
	);
};

export const useSelectedKeyword = () => {
	return useContext(SelectedKeywordContext);
};
