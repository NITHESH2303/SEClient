import React, { useState } from 'react';
import { loginActual } from '../../services/auth';

interface LoginComponentProps {
  onLoginSuccess: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginActual(username, password);
      
      // Save the token in local storage
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('sub', response.sub);
      // Call the onLoginSuccess callback to redirect to the dashboard
      onLoginSuccess();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
      <div className="flex justify-center mb-8">
        <img 
          src="https://th.bing.com/th/id/OSK.fc0b485845f18bc6c70439044750149e?w=80&h=80&r=0&o=6&cb=B&pid=23.1"
          alt="Login"
          className="w-20 h-20 rounded-full"
        />
      </div>
      <h2 className='text-2xl font-bold mb-6 text-gray-800 text-center'>Login</h2>
      {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
            Username
          </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600'
            required
          />
        </div>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;