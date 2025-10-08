import { createContext, useContext, type ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call here
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = { id: '1', email, name: 'John Doe' };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  const register = async (email: string, password: string, name: string) => {
    // In a real app, you would make an API call here
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = { id: '1', email, name };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
