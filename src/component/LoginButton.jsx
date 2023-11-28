import React from 'react';
import { BsBoxArrowRight } from 'react-icons/bs';
import {useNavigate} from "react-router-dom";

export default function LoginButton() {
	const navigator = useNavigate();

	return (
		<button className='flex w-[130px] h-[50px] shadow-lg text-sm rounded-xl items-center justify-center mr-[20px] bg-gray-100 border border-gray-300'
		        onClick={() => navigator(`/login`)} >
			<BsBoxArrowRight size={24} className='mr-[12px]' />
			<p className='mr-[10px]'>로그인</p>
		</button>
	);
}
