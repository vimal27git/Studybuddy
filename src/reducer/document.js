import {SET_DOCUMENTS, ERROR_DOCUMENTS} from '../action/action.types';

const initialState = {
  documents: null,
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
        loading: false,
        error: false,
      };

    case ERROR_DOCUMENTS:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
