import Jwt from '@/@types/Jwt';
import { jwtDecode } from 'jwt-decode';
const STORAGE_KEY = '@Pontua/desafio'

const getCookie = (name: string) => {
  const cookies = `; ${document.cookie}`;
  const parts = cookies.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

const getToken = () => {
  return getCookie(`${STORAGE_KEY}/token`);
};

const setToken = (token: string) => {
  document.cookie = `${STORAGE_KEY}/token=${token};`;
};

const expireAllCookies = () => {
  const cookies = document.cookie.split(';');
  cookies.forEach((cookie) => {
    document.cookie = `${cookie}=;expires=${new Date(0).toUTCString()}`;
  });
};

const decodeJwt = (): Jwt | null => {
  const token = getToken();

  if (token) {
    return jwtDecode(token) as Jwt;
  }

  return null;
};

const logout = () => {
  expireAllCookies();
  location.href = '/login';
}

export {
  getToken,
  setToken,
  decodeJwt,
  logout,
  expireAllCookies
};
