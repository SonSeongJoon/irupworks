import React from 'react';
import { BsPlusSquareFill, BsBookmark, BsBell, BsListCheck } from 'react-icons/bs';

export default function NewsHeader() {
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
				<div className='flex items-center'>
					<BsPlusSquareFill size={16} className='mr-1' />
					<p>그룹추가</p>
				</div>
			</div>
		</div>
	);
}
