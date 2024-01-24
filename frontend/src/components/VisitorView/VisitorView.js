// frontend/src/components/VisitorView/VisitorView.js

import React from 'react';

const VisitorView = ({ user }) => {
  return (
    <div>
      <h1>Public Profile</h1>
      <h2>{user.user_handle}</h2>
      <p>{user.user_subheader}</p>
      {/* Render the links here */}
    </div>
  );
};

export default VisitorView;
