// frontend/src/components/VisitorView.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VisitorRender from './VisitorRender';

const VisitorView = ({ data }) => {
  const { userHandle } = useParams();
  const [userData, setUserData] = useState(data ?? null);

  const api = process.env.REACT_APP_API;

  useEffect(() => {
    if (!userData) {
    const apiUrl = `${api}/users/handle/${userHandle}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }

  }, [api, userData, userHandle]);

  return (
    
    <>{ userData ? (
      <VisitorRender userData={userData} />
      ) : (
        <div></div>
      )
    }</>
  );
};

export default VisitorView;
