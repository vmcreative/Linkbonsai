// frontend/src/components/EditorView/EditorView.js

import React from 'react';

const EditorView = ({ user }) => {
  return (
    <div>
      <h1>Edit Your Links</h1>
      <h2>{user.user_handle}</h2>
      <p>{user.user_subheader}</p>
      {/* Add link management functionality here */}
    </div>
  );
};

export default EditorView;
