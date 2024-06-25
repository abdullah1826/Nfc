

const BASE_URL = 'https://nfc-toolkit.kameti.pk';

const ENDPOINTS = {
  REGISTER: '/api/user/signup',
  LOGIN: '/api/user/signin',
  ResetPassword:"/api/user/forgot-password",
  ConfirmPaaword:"/api/user/reset-password",
  DELETEUSER:"/api/user/delete-account",
 getUserAllTags:"/api/tags",
  GOOGLE_SIGN_IN: 'google_login',
  APPLE_SIGN_IN: 'apple_login',
};

export {BASE_URL, ENDPOINTS};