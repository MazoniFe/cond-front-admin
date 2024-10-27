// AuthContext.tsx
import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  logout: () => void;
}

// Criando o contexto de autenticação
const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // Remove o token de autenticação
    navigate('/login'); // Redireciona para o login
  };

  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
