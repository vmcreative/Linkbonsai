import React from 'react';
import MenuModal from './MenuModal';

const Menu = ({ userData, showModal, handleLogout }) => {
  return (
    <div className='sticky left-0 right-0 top-0 sm:top-2 px-2 w-full z-10'>
      <div className='flex flex-row items-center justify-between h-16 px-3 bg-white -mx-4 sm:mx-0 sm:rounded-4xl shadow'>
        <h2 className='font-sans font-semibold ml-3'>{userData?.user_handle}</h2>
        <button
          id="toggleModal"
          aria-label="Menu"
          title="Menu"
          className='rounded-full w-10 h-10 bg-neutral-300 overflow-hidden bg-cover bg-center'
          style={{ backgroundImage: `url(${userData?.user_image})` }}>
        </button>
        {showModal && <MenuModal userData={userData} handleLogout={handleLogout} />}
      </div>
    </div>
  );
};

export default Menu;