import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  email: string;
  password: string;
  name: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  users: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('sabi_users');
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with default users if no users exist
      const defaultUsers: User[] = [
        { email: 'test@example.com', password: 'password123', name: 'Test User' },
        { email: 'owner@sabi.com', password: 'owner123', name: 'Car Owner' }
      ];
      setUsers(defaultUsers);
      localStorage.setItem('sabi_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      localStorage.setItem('sabi_current_user', JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('sabi_current_user');
  };

  const register = (name: string, email: string, password: string): boolean => {
    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return false;
    }

    const newUser: User = { name, email, password };
    const updatedUsers = [...users, newUser];
    
    setUsers(updatedUsers);
    localStorage.setItem('sabi_users', JSON.stringify(updatedUsers));
    
    return true;
  };

  const value = {
    isLoggedIn,
    currentUser,
    login,
    logout,
    register,
    users,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 