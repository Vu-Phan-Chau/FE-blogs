const ROOT_URL = 'http://localhost:4000/api';

export const API_SERVICES = {
  AUTH_REGISTER: `${ROOT_URL}/auth/register`,
  AUTH_LOGIN: `${ROOT_URL}/auth/login`,
  PROFILE: `${ROOT_URL}/profile`,
  PROFILE_UPDATE: `${ROOT_URL}/profile/update`,
  ALL_BLOG: `${ROOT_URL}/blogs`,
  CREATE_BLOG: `${ROOT_URL}/blogs/create`,
  UPDATE_BLOG: `${ROOT_URL}/blogs/update`,
  DELETE_BLOG: `${ROOT_URL}/blogs/delete`,
};

export const LOCAL_STORAGE = {
  SET_TOKEN: (token: string) => localStorage.setItem('TOKEN', token),
  GET_TOKEN: () => localStorage.getItem('TOKEN'),

  SET_IS_LOGIN: (isLogin: string) => localStorage.setItem(('IS_LOGIN'), JSON.stringify(isLogin)),
  GET_IS_LOGIN: () => JSON.parse(localStorage.getItem('IS_LOGIN') || 'false')
};

export const MODALS = {
  modalLogout: {
    title: 'Logout',
    message: 'Do you want logout?',
    buttons: [
      { key: 'no', value: 'No' },
      { key: 'yes', value: 'Yes' }
    ]
  }
};