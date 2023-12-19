// ModalContext.js
import React, { useState, createContext, useContext } from 'react';

const ModalGroupRemoveContext = createContext();

export const ModalGroupRemoveProvider = ({ children }) => {
	const [isModalGroupRemoveOpen, setIsModalGroupRemoveOpen] = useState(false);

	const openModal = () => setIsModalGroupRemoveOpen(true);
	const closeModal = () => setIsModalGroupRemoveOpen(false);

	return (
		<ModalGroupRemoveContext.Provider value={{ isModalGroupRemoveOpen, openModal, closeModal }}>
			{children}
		</ModalGroupRemoveContext.Provider>
	);
};

export function useModalGroupRemoveContext() {
	return useContext(ModalGroupRemoveContext);
}