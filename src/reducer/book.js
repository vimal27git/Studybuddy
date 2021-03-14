import {SET_BOOK, ERROR_BOOK} from '../action/action.types';

const initialState = {
  books: null,
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK:
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: false,
      };

    case ERROR_BOOK:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
