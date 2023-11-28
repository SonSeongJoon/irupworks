import React, {useEffect, useState} from 'react';
import { signupEmail } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
	const initialFormData = {
		name: '',
		email: '',
		phoneNum: '',
		password: '',
		confirmPassword: '',
	};
	const [formData, setFormData] = useState(initialFormData);
	const [passwordError, setPasswordError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (formData.password !== formData.confirmPassword) {
			setPasswordError('비밀번호가 일치하지 않습니다.');
		} else {
			setPasswordError('');
		}
	}, [formData.password, formData.confirmPassword]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		for (let key in formData) {
			if (formData[key] === '' || formData[key] === null) {
				alert('모든 필드를 입력해주세요.');
				return;
			}
		}

		try {
			await signupEmail(formData);
			alert('가입이 완료되었습니다!');
			console.log('User registered successfully.');
			setFormData(initialFormData);
		} catch (error) {
			console.error('Error registering user:', error);
			alert(`오류가 발생했습니다: ${error.message}`);
		}
	};

	const handleLogin = () => {
		navigate(`/login`);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						회원가입
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="name" className="sr-only">
								이름
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="이름"
								value={formData.name}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="email-address" className="sr-only">
								이메일 주소
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="이메일 주소"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="phoneNum" className="sr-only">
								핸드폰 번호
							</label>
							<input
								id="phoneNum"
								name="phoneNum"
								type="tel"
								required
								className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="핸드폰 번호 ex) 01012345678"
								value={formData.phoneNum}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								비밀번호
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="비밀번호"
								value={formData.password}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="confirm-password" className="sr-only">
								비밀번호 확인
							</label>
							<input
								id="confirm-password"
								name="confirmPassword"
								type="password"
								required
								className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="비밀번호 확인"
								value={formData.confirmPassword}
								onChange={handleChange}
							/>
						</div>
						<div>
							{passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
						</div>
					</div>

					<div>
						<button
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							onClick={handleSubmit}
						>
							가입 하기
						</button>
						<button
							className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							onClick={handleLogin}
						>
							로그인 화면으로 이동
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
