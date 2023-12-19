import React, { createContext, useContext, useState } from 'react';

const KeywordContext = createContext();

export function KeywordProvider({ children }) {
	const [Keyword, setSelectedKeyword] = useState(null);

	const setKeyword = (keyword) => {
		setSelectedKeyword(keyword);
	};

	return (
		<KeywordContext.Provider value={{ Keyword, setKeyword }}>
			{children}
		</KeywordContext.Provider>
	);
}

export function useKeywordContext() {
	return useContext(KeywordContext);
}