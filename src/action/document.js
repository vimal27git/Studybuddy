import database from '@react-native-firebase/database';
import {SET_DOCUMENTS, ERROR_DOCUMENTS} from './action.types';

export const getDocuments = () => async (dispatch) => {
  try {
       database()
        .ref('/documents/')
        .on('value', (snapshot) => {
         console.log('User data: ', snapshot.val());

        if (snapshot.val()) {
          dispatch({
            type: SET_DOCUMENTS,
            payload: Object.values(snapshot.val()),
          });
        } 
        else 
        {
          dispatch({
            type: SET_DOCUMENTS,
            payload: [],
          });
        }
      });

  } 
  catch (error) {
    dispatch({
      type: ERROR_DOCUMENTS,
    });
  }
};
