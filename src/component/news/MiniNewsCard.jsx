import React from 'react';

export default function MiniNewsCard({ title, source, date, tags }) {
	return (
		<div className="bg-white dark:bg-slate-900 border border-red-300 rounded p-2 w-full mb-2 hover:border-red-600 hover:hover:bg-red-50/10 hover:drop-shadow dark:hover:bg-slate-800 dark:border-slate-400">
			<h3 className="mb-1 truncate">{title}</h3>
			<div className="flex text-sm text-gray-500 dark:text-slate-400 mb-1">
				<p>{source}</p>
				<p className="mx-1">|</p>
				<p>{date}</p>
			</div>
			<p className="text-sm text-red-500">{tags}</p>
		</div>
	);
}
