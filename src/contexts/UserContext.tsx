/* eslint-disable no-else-return */
/* eslint-disable import/prefer-default-export */
import React, { createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { postLogin } from '../helpers/connectionsRest';

export interface IUserContext {
  iat: number | null;
  id: number | null;
  email: string | null;
  token: string | null;
  username: string | null;
}

const initialState = {
  iat: null,
  id: null,
  email: null,
  token: null,
  username: null,
};

export const UserContext = createContext<any>(initialState);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUserContext>(initialState);

  const loginUser = (username: string, password: string) => {
    const postData = new FormData();
    postData.append('username', username);
    postData.append('secret', password);

    postLogin(postData)
      .then(async res => {
        const obj: IUserContext = {
          iat: Date.now(),
          id: res.id,
          email: res.email,
          token: res.access_token,
          username: res.user,
        };
        await SecureStore.setItemAsync('mobile-user', JSON.stringify(obj));
        setUser(obj);
      })
      .catch(err => console.log(err));
  };

  const logoutUser = () => {
    setUser({
      iat: null,
      id: null,
      email: null,
      token: null,
      username: null,
    });
    SecureStore.deleteItemAsync('mobile-user');
  };

  const verifyToken = async (): Promise<boolean> => {
    if (user.token) {
      if (expirationControl(user.iat || 0)) {
        return true;
      } else {
        setUser(initialState);
        return false;
      }
    } else {
      return SecureStore.getItemAsync('mobile-user')
        .then(data => {
          if (data) {
            const storageResponse: IUserContext = JSON.parse(data);
            if (expirationControl(storageResponse.iat || 0)) {
              setUser(storageResponse);
              return true;
            } else {
              SecureStore.deleteItemAsync('mobile-user');
              return false;
            }
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loginUser, verifyToken, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => useContext(UserContext);

const expirationControl = (initial: number): boolean => {
  const exp: number = initial + 3600000 * 4;
  if (Date.now() >= exp) return false;
  else return true;
};
