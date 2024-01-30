// frontend/src/componente/EditLinkForm.js

import React, { useState, useEffect, useMemo } from 'react';

const EditLinkForm = ({ item, onEditItem, onDeleteItem }) => {
  const itemData = useMemo(() => {
    return {
      item_text: item.item_text || '',
      item_url: item.item_url || '',
      item_style: item.item_style || 'classic',
      item_thumbnail: item.item_thumbnail || '',
      item_position: item.item_order || 0, // item's starting position in order
      item_order: item.item_order || 0,
      item_id: item.item_id
    };
  }, [item]);

  const [formData, setFormData] = useState({ ...itemData });
  const [hasChanged, setHasChanged] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const formDataKeys = Object.keys(formData);

    const changed = formDataKeys.some((key) => {
      if (key === 'item_order') formData[key] = parseInt(formData[key]);
      return formData[key] !== itemData[key]
    });

    setHasChanged(changed);
  }, [formData, itemData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const type = e.target.dataset.type;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (type === 'selector') {
      onEditItem({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setConfirm(!confirm);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (e.type === 'blur') { // submit on input blur
      if (hasChanged) onEditItem(formData);

    } else if (e.nativeEvent.submitter?.value === 'delete') { // submit on delete
      onDeleteItem(formData);

    } else { // submit on reorder
      formData.item_order = parseInt(
        e.nativeEvent.srcElement
        .querySelector('input[name="item_order"]')
        .value
      );
      onEditItem(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-stretch gap-1 w-full">
      <input type="hidden" name="item_order" value={formData.item_order} />
      <input
        name="item_text"
        type="text"
        value={formData.item_text}
        placeholder="Add some text"
        aria-label="Link Text"
        onChange={handleFormChange}
        onBlur={handleSubmit}
        className="text-sm font-medium hover:bg-neutral-50 border-2 border-transparent hover:border-neutral-100 focus:bg-neutral-100 max-w-xl h-8 rounded-lg pl-3 cursor-pointer"
      />
      <input
        name="item_url"
        type="url"
        value={formData.item_url}
        placeholder="URL"
        aria-label="Link URL"
        onChange={handleFormChange}
        onBlur={handleSubmit}
        className="text-sm font-light hover:bg-neutral-50 border-2 border-transparent hover:border-neutral-100 focus:bg-neutral-100 max-w-xl h-8 rounded-lg pl-3 cursor-pointer"
        required
      />
      <input
        name="item_thumbnail"
        type="url"
        value={formData.item_thumbnail}
        placeholder="Add a thumbnail link"
        aria-label="Link Thumbnail URL"
        onChange={handleFormChange}
        onBlur={handleSubmit}
        className="text-sm font-light hover:bg-neutral-50 border-2 border-transparent hover:border-neutral-100 focus:bg-neutral-100 max-w-xl h-8 rounded-lg pl-3 cursor-pointer"
      />
      <div className='flex flex-row items-center grow'>
        <label htmlFor={`item_style__${itemData.item_id}`} className="text-sm ml-3.5 w-24">
          Link Style:
        </label>
        <select
          name="item_style"
          id={`item_style__${itemData.item_id}`}
          data-type="selector"
          value={formData.item_style}
          aria-label="Link Style"
          onChange={handleFormChange}
          className="text-sm font-light hover:bg-neutral-50 border-2 border-neutral-50 hover:border-neutral-100 focus:bg-neutral-100 w-40 h-8 rounded-lg pl-3 cursor-pointer"
          required
        >
          <option value="classic">Classic</option>
          <option value="featured">Featured</option>
        </select>
      </div>

      <div className="flex flex-row sm:justify-end mt-3">
        {confirm ? (
          <button
            type="submit"
            value="delete"
            aria-label="Confirm Delete"
            onBlur={handleConfirm}
            className="text-sm h-8 rounded-2xl border-2 border-red-600 hover:border-red-800 text-white bg-red-600 hover:bg-red-800 w-24">
            Confirm
          </button>
        ) : (
          <button
            type="button"
            aria-label="Delete Link"
            onClick={handleConfirm}
            className="text-sm h-8 rounded-2xl border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 w-24">
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default EditLinkForm;
