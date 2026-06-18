import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import api from '../lib/api.js';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'luxdrive_auth';

const getStoredAuth = () => {
  try {
    const value = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth);
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(auth?.token));

  const persistAuth = useCallback((nextAuth) => {
    setAuth(nextAuth);

    if (nextAuth) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
      api.defaults.headers.common.Authorization = `Bearer ${nextAuth.token}`;
      return;
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    delete api.defaults.headers.common.Authorization;
  }, []);

  useEffect(() => {
    if (!auth?.token) {
      setIsBootstrapping(false);
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${auth.token}`;

    const hydrateUser = async () => {
      try {
        const { data } = await api.get('/auth/me');
        persistAuth({ token: auth.token, user: data.user });
      } catch {
        persistAuth(null);
      } finally {
        setIsBootstrapping(false);
      }
    };

    hydrateUser();
  }, []);

  const signup = useCallback(
    async (payload) => {
      const { data } = await api.post('/auth/signup', payload);
      persistAuth({ user: data.user, token: data.token });
      return data;
    },
    [persistAuth]
  );

  const login = useCallback(
    async (payload) => {
      const { data } = await api.post('/auth/login', payload);
      persistAuth({ user: data.user, token: data.token });
      return data;
    },
    [persistAuth]
  );

  const logout = useCallback(() => {
    persistAuth(null);
  }, [persistAuth]);

  const value = useMemo(
    () => ({
      user: auth?.user || null,
      token: auth?.token || null,
      isAuthenticated: Boolean(auth?.token),
      isBootstrapping,
      signup,
      login,
      logout
    }),
    [auth, isBootstrapping, login, logout, signup]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
