

const BASE_URL = 'https://nfc-toolkit.kameti.pk';

const ENDPOINTS = {
  REGISTER: '/api/user/signup',
  LOGIN: '/api/user/signin',
  ResetPassword:"/api/user/forgot-password",
  ConfirmPaaword:"/api/user/reset-password",
  DELETEUSER:"/api/user/delete-account",
 getUserAllTags:"/api/tags",
CreateTag:"/api/tag/create",
DeleteTag:"/api/tag/",
};

export {BASE_URL, ENDPOINTS};