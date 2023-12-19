import React, {useState} from 'react';
import { BsBookmark, BsBell, BsListCheck } from 'react-icons/bs';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import {useModalContext} from "../../context/ModalContext";

export default function NewsHeader({ onAddGroup }) {
	const [newGroupName, setNewGroupName] = useState('');
	const { isModalOpen, openModal, closeModal } = useModalContext();

	const handleAddGroup = () => {
		onAddGroup(newGroupName);
		setNewGroupName('');
		closeModal();
	};

	return (
		<div className='mb-2'>
			<div className='mb-5'>
				<h1 className='text-2xl font-bold mb-3'>뉴스 클리핑</h1>
				<div className='flex items-center mb-2'>
					<BsBookmark size={15} className='mr-2' />
					<p>저장된 뉴스</p>
				</div>
				<div className='flex items-center mb-2'>
					<BsBell size={15} className='mr-2' />
					<p>알림 설정</p>
				</div>
				<div className='flex items-center'>
					<BsListCheck size={15} className='mr-2' />
					<p>브리핑 목록</p>
				</div>
			</div>
			<div className='flex justify-between text-sm mb-2'>
				<p>키워드 그룹</p>
				<div className='flex items-center' onClick={openModal}>
					<AiOutlinePlusSquare size={18} className='mr-1 text-gray-600' />
					<p>그룹추가</p>
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-10 overflow-y-auto h-full w-full flex justify-center items-center">
					<div className="bg-white p-5 rounded-lg shadow-xl m-4 max-w-sm w-full">
						<p className='text-lg font-bold mb-2'>키워드 그룹 추가</p>
						<input
							type="text"
							value={newGroupName}
							onChange={(e) => setNewGroupName(e.target.value)}
							placeholder='새 그룹 이름 입력'
							className='border-2 border-gray-300 p-2 w-full mb-4'
						/>
						<div className="flex justify-end space-x-2">
							<button onClick={handleAddGroup} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">등록</button>
							<button onClick={closeModal} className="px-4 py-2 bg-gray-300 text-black rounded">취소</button>
						</div>
					</div>
				</div>

			)}
		</div>

	);
}
