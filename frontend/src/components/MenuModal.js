import React from 'react';

const MenuModal = ({ userData, handleLogout }) => {
  return (
    <div onClick={(e) => e.stopPropagation()} className="absolute top-14 right-0 sm:right-4 p-4 bg-white rounded-b-3xl sm:rounded-3xl shadow-xl w-full sm:w-80">
      <div className='flex items-center'>
        <div className='rounded-full w-10 h-10 mr-4 bg-neutral-300 overflow-hidden  bg-cover bg-center' style={{ backgroundImage: `url(${userData?.user_image})` }}></div>
        <h2 className='font-semibold'>{userData?.user_first_name} {userData?.user_last_name}</h2>
      </div>
      <a href={`/${userData.user_handle}`} target='_blank' rel='noopener noreferrer'>
        <button className="text-neutral-800 h-12 text-sm w-full rounded-2xl hover:bg-neutral-100 text-left mt-2 pl-4">View your site</button>
      </a>
      <button onClick={handleLogout} className="text-neutral-800 h-12 text-sm w-full rounded-2xl hover:bg-neutral-100 text-left mt-2 pl-4">Sign out</button>
    </div>
  );
};

export default MenuModal;
