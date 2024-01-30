import React from 'react';
import VisitorRender from './VisitorRender';

const VisitorPreview = ({ userData }) => {
  return (
    <div className="relative">
      <div className="w-[320px] h-[690px] box-content overflow-scroll rounded-5xl border-[16px] border-black -mx-7 lg:mx-4 bg-neutral-400 scale-75 lg:scale-100">
        {userData && <VisitorRender userData={userData} preview={true} />}
      </div>
      {userData && 
        <a href={`/${userData.user_handle}`} target='_blank' rel='noopener noreferrer' className='absolute top-6 lg:-top-16 left-1/2 -translate-x-1/2 rounded-3xl text-sm text-neutral-500 bg-neutral-50 hover:bg-white hover:shadow-md px-4 py-2'>
          View your site live
        </a>
      }
    </div>
  );
};

export default VisitorPreview;
