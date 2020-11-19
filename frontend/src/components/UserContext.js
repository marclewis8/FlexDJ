import React, { createContext, useState, useEffect } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const UserContext = createContext();

export const setUserCookie = (ctx, user) => {
  setCookie(ctx, 'user', user, {
    maxAge: 60 * 60 * 1000, // 1 hour
  });
};

export const getUserCookie = (ctx) => {
  return parseCookies(ctx).user;
};

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (getUserCookie(null)) {
      setUser(JSON.parse(getUserCookie(null)));
    }
  }, []);

  const storeUser = (user) => {
    setUser(user);
    setUserCookie(null, JSON.stringify(user));
  };

  const logout = () => {
    destroyCookie(null, 'user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, storeUser, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};
