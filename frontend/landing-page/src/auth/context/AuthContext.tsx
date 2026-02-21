import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Dados mockados - REMOVER quando integrar com backend
const MOCK_USER = {
  email: 'pablo@gmail.com',
  password: '@Pablosilva621',
  name: 'Pablo Silva',
  id: '1',
};

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Carrega usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('mock_auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('mock_auth_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));

    // Valida credenciais mockadas
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const userData = {
        id: MOCK_USER.id,
        name: MOCK_USER.name,
        email: MOCK_USER.email,
      };
      setUser(userData);
      localStorage.setItem('mock_auth_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock_auth_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
