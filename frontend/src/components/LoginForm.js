// frontend/src/components/LoginForm.js

import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: 'demo@email.com',
    password: 'password',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  const isSubmitDisabled = !formData.email || !formData.password;

  return (
    <form onSubmit={handleLogin} className='flex flex-col items-stretch w-full max-w-xl mt-12'>
      <input
        className='bg-neutral-100 mb-4 h-12 rounded-lg pl-3'
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleFormChange} />
      <input
        className='bg-neutral-100 mb-8 h-12 rounded-lg pl-3'
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleFormChange} />
      <button
        type="submit"
        className={`h-12 rounded-3xl ${isSubmitDisabled ? 'bg-stone-200 text-stone-500 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800 text-white'}`}
        disabled={isSubmitDisabled}>
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
