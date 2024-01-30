import React, { useState, useEffect } from 'react';
import NewLinkForm from './NewLinkForm';
import EditLinkForm from './EditLinkForm';
import dragToReorder from '../utils/dragToReorder';
import DragIcon from '../assets/dragIcon';
import { addItem, editItem, deleteItem } from '../utils/api';

const LinkEditor = ({ userData, setUserData, session }) => {
  const [showForm, setShowForm] = useState(false);

  // Function for handling item changes (add, edit, delete)
  const handleItemChange = async (operation, formData, setFormData) => {
    try {
      const response = await operation(formData, session);
      if (response.ok) {
        const updatedItems = await response.json();
        setUserData((prevUserData) => ({
          ...prevUserData,
          items: updatedItems,
        }));
        if (setFormData) {
          setFormData({ url: '' });
        }
        setShowForm(false);
      } else {
        console.error(`Failed to ${operation.name} item`);
      }
    } catch (error) {
      console.error(`Error ${operation.name} item:`, error);
    }
  };

  // Individual operations
  const onAddItem = (formData, setFormData) => handleItemChange(addItem, formData, setFormData);
  const onEditItem = (formData) => handleItemChange(editItem, formData);
  const onDeleteItem = (formData) => handleItemChange(deleteItem, formData);

  useEffect(() => {
    const container = document.querySelector('.linkList');
    const items = Array.from(document.querySelectorAll('.linkItem'));
    if (container && items.length > 0) {
      dragToReorder(container, items);
    }
  }, [userData]);

  const renderLinkForm = () => (
    <div className='bg-white rounded-3xl p-5 shadow-sm mb-4 relative w-full'>
      <div className='flex flex-row justify-between mb-5'>
        <h2 className='font-sans font-semibold text-2xl'>Enter URL</h2>
        <button onClick={() => setShowForm(false)} className='text-lg absolute top-3 right-3 hover:bg-neutral-100 w-10 h-10 rounded-full'>
          &#x2715;
        </button>
      </div>
      <NewLinkForm onAddItem={onAddItem} />
    </div>
  );

  const renderLinkItems = () => userData?.items
    ?.sort((a, b) => a.item_order - b.item_order)
    .map((item) => (
      <div key={item.item_id} className='linkItem pb-4 absolute w-full'>
        <div className="itemContent bg-white rounded-3xl p-4 pl-3 shadow-sm flex flex-row items-center">
          <div title="Move" aria-label="Reorder Link" className="dragger w-6 h-40 mr-3 cursor-grab flex justify-center items-center">
            <DragIcon fill='grey' />
          </div>
          <EditLinkForm item={item} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
        </div>
      </div>
    ));

  return (
    <>
      {showForm ? renderLinkForm() : (
        <button onClick={() => setShowForm(true)} className='h-12 w-full rounded-3xl bg-purple-700 hover:bg-purple-800 text-white mb-4'>
          &#65291; Add link
        </button>
      )}
      <div className='linkList w-full relative'>
        {renderLinkItems()}
      </div>
    </>
  );
};

export default LinkEditor;
