export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

const initialState = {
  user: {
    userId: null,
    username: null
  }
};

export const contextReducer = (state = initialState, action) => {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case AUTH_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
};