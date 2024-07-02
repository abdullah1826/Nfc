import {ENDPOINTS, HTTP_CLIENT} from '../../../exporter';

export const getAllTags = () => {
  return HTTP_CLIENT.get(ENDPOINTS.getUserAllTags);
};

export const createTags = (params:any) => {
  return HTTP_CLIENT.post(ENDPOINTS.CreateTag, params);
};

export const deleteTags = (Id:any) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.DeleteTag}${Id}`);
};

// export const getFilteredActivity = (params:any) => {
//   return HTTP_CLIENT.get(
//     `${ENDPOINTS.ACTIVITY}/activities_filter?scope=${params}`,
//   );
// };
