import {ENDPOINTS, HTTP_CLIENT} from '../../../exporter';

export const getAllTags = () => {
  return HTTP_CLIENT.get(ENDPOINTS.getUserAllTags);
};

// export const getFilteredActivity = (params:any) => {
//   return HTTP_CLIENT.get(
//     `${ENDPOINTS.ACTIVITY}/activities_filter?scope=${params}`,
//   );
// };
