// NoNewsMessage.jsx
import {MdFolderOff} from "react-icons/md";

export default function NoNewsMessage() {
	return (
		<div className="flex flex-col items-center justify-center h-2/3">
			<div className="text-gray-500 text-3xl mb-2">
				<MdFolderOff size={60} className='text-gray-300'/>
			</div>
			<p className="text-lg text-gray-800">뉴스를 찾지 못했습니다.</p>
			<p className="text-sm text-gray-600">검색 조건 또는 조건 기간을 변경해 보세요.</p>
		</div>
	);
};

