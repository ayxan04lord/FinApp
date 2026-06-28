import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('finapp_user');
    return saved ? JSON.parse(saved) : null;
  });

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('finapp_users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Bu email artıq qeydiyyatdan keçib.' };
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('finapp_users', JSON.stringify(users));
    const loggedIn = { id: newUser.id, name, email };
    setUser(loggedIn);
    localStorage.setItem('finapp_user', JSON.stringify(loggedIn));
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('finapp_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      return { success: false, message: 'Email və ya şifrə yanlışdır.' };
    }
    const loggedIn = { id: found.id, name: found.name, email: found.email };
    setUser(loggedIn);
    localStorage.setItem('finapp_user', JSON.stringify(loggedIn));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('finapp_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
