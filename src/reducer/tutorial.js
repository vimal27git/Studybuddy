import {SET_TUTORIAL, ERROR_TUTORIAL} from '../action/action.types';

const initialState = {
  tutorials: null,
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TUTORIAL:
      return {
        ...state,
        tutorials: action.payload,
        loading: false,
        error: false,
      };

    case ERROR_TUTORIAL:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
