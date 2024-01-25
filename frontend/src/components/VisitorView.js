import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OptionsIcon from '../assets/optionsIcon';

const VisitorView = () => {
  const { userHandle } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // backend API endpoint for fetching user data
    const apiUrl = `http://localhost:4000/api/users/handle/${userHandle}`;

    // Make the API request
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userHandle]);

  if (!userData) return (
    <div>Loading...</div>
  );

  // Destructure userData for cleaner references
  const { user_theme, user_image, user_header, user_subheader, items } = userData;

  return (
    <div className={`theme__${user_theme} bg-[--darker] h-screen px-4 py-16`}>
      <div className='mx-auto max-w-2xl'>
        <div className='w-full text-[--light] text-center flex flex-col items-center'>
          <img alt={userHandle} src={user_image} className='rounded-full w-52 mb-4' />
          <h1 className='font-sans font-semibold text-xl'>{user_header}</h1>
          <p className='mt-1'>{user_subheader}</p>
        </div>
        <div className='w-full mt-8'>
          {items.map((item) => (
            <div key={item.item_id} className={'bg-[--dark] mb-4 rounded-sm relative hover:animate-pop hover:scale-101 transition-transofrm drop-shadow-md'}>
              <a href={item.item_url} className='text-[--text] flex flex-col items-center' target='_blank' rel='noopener noreferrer'>
                <img alt={item.item_text} src={item.item_thumbnail} className={item.item_style === 'classic' ? 'invert-[--invert] w-12 h-12 rounded-lg absolute h-12 w-12 left-2  top-1/2 -translate-y-1/2' : 'shadow-inner'} />
                <h2 className={`w-full ${item.item_style === 'classic' ? 'px-16 py-3.5 text-center' : 'absolute bottom-6 left-6'}`}>{item.item_text}</h2>
              </a>
              <button className={`rounded-full absolute right-2 w-10 h-10 flex items-center justify-center ${item.item_style === 'classic' ? 'top-1/2 -translate-y-1/2 hover:bg-[--medium] transition-background' : 'bottom-3'}`}>
                <OptionsIcon fill='var(--text)' />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitorView;
