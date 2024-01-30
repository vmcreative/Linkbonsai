

import React from 'react';
import OptionsIcon from '../assets/optionsIcon';

const VisitorRender = ({ userData, preview }) => {
  return (
    <div className={`
      theme__${userData.user_theme}
      ${preview ? 'h-full' : 'h-screen'}
      bg-[--darker] overflow-auto px-4 py-16`}>
      <div className='mx-auto max-w-l md:max-w-xl lg:max-w-2xl'>
        <div className='w-full text-[--text] text-center flex flex-col items-center'>
          {userData.user_image && (
            <div
              className='rounded-full w-52 h-52 mb-4 bg-[--medium]  overflow-hidden bg-cover bg-center'
              style={{ backgroundImage: `url(${userData?.user_image})` }}>
            </div>
          )}
          <h1 className='font-sans font-semibold text-xl'>{userData.user_header}</h1>
          <p className='mt-1'>{userData.user_subheader}</p>
        </div>
        <div className='w-full mt-8'>
          {userData.items?.sort((a, b) => a.item_order - b.item_order).map((item) => (
            <div key={item.item_id} className={'bg-[--dark] mb-4 rounded-lg relative overflow-hidden hover:animate-pop hover:scale-101 transition-transofrm drop-shadow-md'}>
              <a href={item.item_url} className={` flex flex-col items-center ${item.item_style === 'featured' ? 'aspect-[5/3] overflow-hidden justify-center' : 'min-h-12' }`} target='_blank' rel='noopener noreferrer'>
                {item.item_thumbnail && (
                  <div
                    style={{ backgroundImage: `url(${item.item_thumbnail})` }}
                    className={item.item_style === 'featured' ? 'shadow-inner h-full w-full bg-[--medium] overflow-hidden bg-cover bg-center' : 'w-11 h-11 rounded-lg absolute left-1.5 top-1/2 -translate-y-1/2'}>
                  </div>
                )}
                <h2 className={`w-full ${item.item_style === 'featured' ? 'absolute bottom-6 left-6 text-[--light]' : 'text-[--text] px-16 py-3.5 text-center '}`}>{item.item_text ? item.item_text : item.item_url}</h2>
              </a>
              <button
                className={`rounded-full absolute right-2 w-10 h-10 flex items-center justify-center ${item.item_style === 'featured' ? 'bottom-3' : 'top-1/2 -translate-y-1/2 hover:bg-[--medium] transition-background'}`}>
                <OptionsIcon fill={item.item_style === 'featured' ? 'var(--light)' : 'var(--text)'} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitorRender;
