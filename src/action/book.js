import database from '@react-native-firebase/database';
import {SET_BOOK, ERROR_BOOK} from './action.types';

export const getBooks = () => async (dispatch) => {
  try {
    database()
      .ref('/books/')
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());

        if (snapshot.val()) {
          dispatch({
            type: SET_BOOK,
            payload: Object.values(snapshot.val()),
          });
        }
         else {
          dispatch({
            type: SET_BOOK,
            payload: [],
          });
        }
      });

      } catch (error)
       {
          dispatch({
              type: ERROR_BOOK,
          });
        }
};
