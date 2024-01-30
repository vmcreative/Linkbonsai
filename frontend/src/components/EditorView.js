import React, { useState, useEffect, useCallback } from 'react';
import LoginForm from './LoginForm';
import Menu from './Menu';
import UserEditor from './UserEditor';
import LinkEditor from './LinkEditor';
import VisitorPreview from './VisitorPreview';
import { getSessionToken, setSessionToken, removeSessionToken } from '../utils/session';
import { loginUser, fetchUserData } from '../utils/api';

const EditorView = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loginSubmit = async (formData) => {
    try {
      const response = await loginUser(formData);

      if (response.ok) {
        const { token, userData } = await response.json();
        handleLogin(token, userData);
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
    }
  };

  const handleLogin = useCallback((token, userData) => {
    if (token) {
      setSessionToken(token);
    }
    if (userData) {
      setUserData(userData);
    }
  }, []);

  const handleLogout = useCallback(() => {
    removeSessionToken();
    setUserData(null);
    setShowModal(false);
  }, []);

  const menuModal = (e) => {
    if (e.target.id === 'toggleModal') setShowModal(!showModal);
    else setShowModal(false);
  };

  useEffect(() => {
    const init = async () => {
      const token = getSessionToken();

      if (token && !userData) {
        try {
          const response = await fetchUserData(token);
          if (response.ok) {
            const data = await response.json();
            handleLogin(token, data);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          handleLogout();
        }
      } else if (!token) {
        handleLogout();
      }
    };

    init();
  }, [handleLogin, handleLogout, userData]);

  const renderEditorView = () => (
    <div onClick={menuModal} className={`theme__${userData?.user_theme} bg-neutral-100 w-screen min-h-screen overflow-auto`}>
      <Menu userData={userData} showModal={showModal} handleLogout={handleLogout} />
      <div className="flex flex-row w-screen h-screen absolute left-0 top-0 justify-stretch items-stretch">
        <div className="pt-24 px-4 border-r relative grow max-w-2xl overflow-auto">
          <UserEditor userData={userData} setUserData={setUserData} session={getSessionToken()} />
          <LinkEditor userData={userData} setUserData={setUserData} session={getSessionToken()} />
        </div>
        <div className="h-full justify-center items-center mx-auto hidden sm:flex">
          <VisitorPreview userData={userData} />
        </div>
      </div>
    </div>
  );

  const renderLoginForm = () => (
    <div className="bg-white h-screen px-4 py-16 flex flex-col justify-center items-center">
      <h1 className='font-sans font-black text-5xl'>Welcome back</h1>
      <p className='leading-10 text-neutral-500'>Log in to your Linkbonsai</p>
      <LoginForm onLogin={loginSubmit} />
    </div>
  );

  return (
    <>
      {getSessionToken() ? renderEditorView() : renderLoginForm()}
    </>
  );
};

export default EditorView;
