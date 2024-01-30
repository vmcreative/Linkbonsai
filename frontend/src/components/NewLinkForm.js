// frontend/src/components/NewLinkForm.js

import React, { useState } from 'react';

const NewLinkForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState({ item_url: '' });

  const handleFormChange = (e) => setFormData({ item_url: e.target.value });

  const handleAddItem = async (e) => {
    e.preventDefault();
    onAddItem(formData, setFormData);
  };

  const isSubmitDisabled = !formData.item_url;

  return (
    <form onSubmit={handleAddItem} className='flex flex-row' >
      <input
        className='bg-neutral-100 mb-4 h-12 grow rounded-lg pl-3 mr-5'
        type = "url"
        placeholder = "URL"
        value = { formData.item_url }
        onChange={handleFormChange} />
      <button
        type = "submit"
        className = {`h-12 w-20 rounded-3xl ${isSubmitDisabled ? 'bg-stone-200 text-stone-500 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800 text-white'}`}
        disabled = { isSubmitDisabled }>
        Add
      </button>
    </form>
  );
};

export default NewLinkForm;