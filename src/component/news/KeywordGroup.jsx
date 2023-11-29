import { useState } from 'react';
import {BsCaretDownFill, BsCaretRightFill, BsThreeDots} from "react-icons/bs";
import {CiFolderOn} from "react-icons/ci";
import {GoPlus} from "react-icons/go";


export default function KeywordGroup({title}) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
			<div className='mb-2'>
				<div className='group flex items-center justify-between'>
					<div className='flex items-center'>
						{isDropdownOpen ? (
							<BsCaretDownFill
								size={12}
								className='mr-2 cursor-pointer'
								onClick={toggleDropdown}
							/>
						) : (
							<BsCaretRightFill
								size={12}
								className='mr-2 cursor-pointer'
								onClick={toggleDropdown}
							/>
						)}
						<CiFolderOn size={24} className='mr-1'/>
						<h2 className='text-lg'>{title}</h2>
					</div>
					<div className='flex opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300'>
						<BsThreeDots className='mr-1'/>
						<GoPlus/>
					</div>
				</div>
				<div
					className={`overflow-hidden transition-max-h ease-in-out duration-300 ${
						isDropdownOpen ? 'max-h-[100px]' : 'max-h-0'
					}`}
				>
					<div className='px-6 py-1'>
						<p className='text-sm mb-1'># 서울IR 네트워크</p>
						<p className='text-sm mb-1'># 서울IR 네트워크</p>
						<p className='text-sm'># 서울IR 네트워크</p>
					</div>
				</div>
			</div>
	);
}