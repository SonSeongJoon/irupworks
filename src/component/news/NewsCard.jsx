import React from 'react';

export default function NewsCard({
  title,
  content,
  press,
  category,
  date,
  img,
  address_url,
}) {
  return (
    <div>
      <div className='py-3 flex-col justify-between'>
        <div className='flex-col'>
          <div className='flex text-sm mb-2'>
            <p className='mr-1 font-bold'>{press}</p>
            <p className='mr-1'>{category}</p>
            <p>{date}</p>
          </div>
          <div className='flex gap-5'>
            <div className='w-5/6'>
              <a href={address_url} target='_blank' rel='noopener noreferrer'>
                <h2 className='text-xl dark:text-slate-200 mb-2 hover:underline cursor-pointer'>
                  {title}
                </h2>
              </a>{' '}
              <p className='text-sm line-clamp-2'>{content}</p>
            </div>
            <div className='flex w-1/6 justify-end'>
              <img
                src={img}
                alt='이미지'
                className='w-[100px] h-[90px] object-cover bg-sky-50'
              />
            </div>
          </div>
        </div>
        <div>
          <hr className='border-t border-slate-400 dark:border-slate-600 mt-2 w-full' />
        </div>
      </div>
    </div>
  );
}
