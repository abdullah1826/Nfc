import {ENDPOINTS, HTTP_CLIENT} from "../../../exporter";
import { BASE_URL } from "../../../exporter";
//Authentication Requests
export const registerUser = (params:any) => {
  return HTTP_CLIENT.post(ENDPOINTS.REGISTER, params);
};
export const loginUser = (params:any) => {
  return HTTP_CLIENT.post(ENDPOINTS.LOGIN, params);
};
export const ResetNewPassword = (params:any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ResetPassword, params);
};

export const ConfirmNewPassword = (params:any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ConfirmPaaword, params);
};

export const deleteCurrentUser = () => {
  return HTTP_CLIENT.delete(ENDPOINTS.DELETEUSER);
};
// export const socialLogin = (logintype, params) => {
//   return HTTP_CLIENT.post(
//     `${
//       logintype == 'google'
//         ? ENDPOINTS.GOOGLE_SIGN_IN
//         : ENDPOINTS?.APPLE_SIGN_IN
//     }`,
//     params,
//   );
// };




// export const deleteUser = () => {
//   return HTTP_CLIENT.delete(ENDPOINTS.DELETE_USER);
// };

// export const selctedUserMode = async (userMode, token) => {
//   let selctedMode = userMode === 'weight-mode' ? 'exercise' : 'pedometer';
//   return HTTP_CLIENT.post(
//     `${ENDPOINTS.SELECT_USER_MODE}?mode=${selctedMode}`,
//     {},
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + token,
//       },
//     },
//   );
// };

export const userpersonalInformation = async (params, token) => {
  return HTTP_CLIENT.post(`${ENDPOINTS.PERSONAL_INFO}`, params, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};

