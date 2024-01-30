// frontend/src/component/UserEditor.js

import React from 'react';
import EditUserForm from './EditUserForm';

const UserEditor = ({ userData, setUserData, session }) => {
  const onEditUser = async (formData) => {
    const formatted = { ...formData };
    for (const key in formatted) {
      if (formatted[key] === '') formatted[key] = null;
    }

    try {
      const response = await fetch(`/api/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: session,
        },
        body: JSON.stringify(formatted),
      });

      if (response.ok) {
        const updatedUser = await response.json();

        setUserData((prevUserData) => ({
          ...prevUserData,
          ...updatedUser,
        }));
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className='bg-white rounded-3xl p-5 shadow-sm mb-6 relative w-full'>
      <div className='flex flex-row justify-between mb-5'>
        <h2 className='font-sans font-semibold text-2xl'>Profile</h2>
      </div>
      {userData && <EditUserForm onEditUser={onEditUser} data={userData} />}
    </div>
  );
};

export default UserEditor;