// frontend/src/componente/EditLinkForm.js

import React, { useState, useEffect, useMemo } from 'react';

const EditUserForm = ({ data, onEditUser }) => {
  const userData = useMemo(() => {
    return {
      user_header: data.user_header || '',
      user_subheader: data.user_subheader || '',
      user_image: data.user_image || '',
      user_theme: data.user_theme || 'light'
    };
  }, [data]);

  const [formData, setFormData] = useState({ ...userData });
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    const formDataKeys = Object.keys(formData);

    const changed = formDataKeys.some((key) => {
      return formData[key] !== userData[key]
    });

    setHasChanged(changed);
  }, [formData, userData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const type = e.target.dataset.type;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (type === 'selector') {
      onEditUser({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasChanged) onEditUser(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-stretch gap-1 w-full">
      <div className='flex flex-row items-center grow'>
        <label htmlFor="user_header" className="text-sm ml-3.5 w-24">
          Profile Title:
        </label>
        <input
          name="user_header"
          id="user_header"
          type="text"
          value={formData.user_header}
          placeholder="Add a title"
          aria-label="Profile Title"
          onChange={handleFormChange}
          onBlur={handleSubmit}
          className="text-sm font-medium bg-neutral-50 border-2 border-transparent hover:border-neutral-100 focus:bg-neutral-100 w-full max-w-xl h-8 rounded-lg pl-3 cursor-pointer"
        />
      </div>
      <div className='flex flex-row items-center grow'>
        <label htmlFor="user_subheader" className="text-sm ml-3.5 w-24">
          Proile Bio:
        </label>
        <textarea
          name="user_subheader"
          id="user_subheader"
          type="text"
          value={formData.user_subheader}
          placeholder="Add a bio"
          aria-label="User Bio"
          onChange={handleFormChange}
          onBlur={handleSubmit}
          className="text-sm font-light bg-neutral-50 border-2 border-transparent hover:border-neutral-100 focus:bg-neutral-100 w-full max-w-xl min-h-20 max-h-96 rounded-lg pl-3 cursor-pointer">
        </textarea>
      </div>
      <div className='flex flex-row items-center grow'>
        <label htmlFor="user_image" className="text-sm ml-3.5 w-24">
          Image:
        </label>
        <input
          name="user_image"
          id="user_image"
          type="url"
          value={formData.user_image}
          placeholder="Add a thumbnail link"
          aria-label="Link Thumbnail URL"
          onChange={handleFormChange}
          onBlur={handleSubmit}
          className="text-sm font-light hover:bg-neutral-50 border-2 border-transparent hover:border-neutral-100 focus:bg-neutral-100 w-full max-w-xl h-8 rounded-lg pl-3 cursor-pointer"
        />
      </div>
      <div className='flex flex-row items-center grow'>
        <label htmlFor={'user_theme'} className="text-sm ml-3.5 w-24">
          Theme:
        </label>
        <select
          name="user_theme"
          id="user_theme"
          data-type="selector"
          value={formData.user_theme}
          aria-label="User Theme"
          onChange={handleFormChange}
          className="text-sm font-light hover:bg-neutral-50 border-2 border-neutral-50 hover:border-neutral-100 focus:bg-neutral-100 w-40 h-8 rounded-lg pl-3 cursor-pointer"
          required
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </form>
  );
};

export default EditUserForm;
