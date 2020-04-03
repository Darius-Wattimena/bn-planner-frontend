import {createClient} from 'react-fetching-library';
import {BASE_URL} from "../Settings";

export const requestHostInterceptor = host => client => async action => {
  return {
    ...action,
    endpoint: `${host}${action.endpoint}`
  };
};

export const Client = createClient({
  requestInterceptors: [requestHostInterceptor(BASE_URL)],
});