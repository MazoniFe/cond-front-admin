import React, { useEffect, useState } from 'react';
import Spinner from '../assets/components/Spinner';
import doLogin from '../service/UserService';
import { loginResponse } from '../assets/components/types';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setSubmitisDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitisDisabled(true);
    
    try {
      const doLoginResponse : loginResponse = await doLogin(email, password);
      if(doLoginResponse.token) {
        navigate('/admin/residents');
      } else {
        console.log("FALHA AO LOGAR");
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setIsLoading(false);
      setSubmitisDisabled(false);
    }
  };


  useEffect(() => {
    localStorage.removeItem("token");
  }, []);



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 z-10'>
        <Spinner />
      </div>
      )}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-10 rounded-lg shadow-lg w-80 transition-transform transform hover:scale-105"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-600">Acesso Administração</h2>
        
        <div className="mb-6">
          <label 
            className="block text-gray-700 text-sm font-semibold mb-2" 
            htmlFor="email"
          >
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="shadow-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Seu email"
          />
        </div>
  
        <div className="mb-6">
          <label 
            className="block text-gray-700 text-sm font-semibold mb-2" 
            htmlFor="password"
          >
            Senha
          </label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="shadow-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Sua senha"
          />
        </div>
  
        <div className="mt-6 flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            disabled={isSubmitDisabled}
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
    
export default LoginPage;