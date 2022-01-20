import { AUTH_FAILURE, AUTH_SUCCESS } from '../reducers/contextReducer';

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    payload: token
  };
};

export const authFailure = () => {
  return {
    type: AUTH_FAILURE
  };
};
