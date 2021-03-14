import {SETUSER_TUTORIAL,ERRORUSER_TUTORIAL} from '../action/action.types';

const initialState = {
  usertutorials: null,
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SETUSER_TUTORIAL:
      return {
        ...state,
       usertutorials: action.payload,
        loading: false,
        error: false,
      };

    case ERRORUSER_TUTORIAL:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
