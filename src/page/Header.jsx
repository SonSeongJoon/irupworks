import React from 'react';
import {FiMenu} from "react-icons/fi";
import AccountLogin from "../component/AccountLogin";
import {useAuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import AccountLogout from "../component/LoginButton";

export default function Header({toggleSidebar}) {
	const navigator = useNavigate();
	const { user, logout } = useAuthContext();

	const handleLogout = async () => {
		try {
			await logout();
			navigator("/login");
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	return (
		<div className={`flex h-[65px] shadow-lg justify-between items-center backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900`}>
			<button className='ml-[18px]' onClick={toggleSidebar}>
				<FiMenu size={24} className='text-primary dark:text-slate-400'/>
			</button>
			{user && <AccountLogin handleLogout={handleLogout}/>}
			{!user && <AccountLogout/>}
		</div>
		
	);
}
