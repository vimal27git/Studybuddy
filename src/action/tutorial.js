import database from '@react-native-firebase/database';
import {SET_TUTORIAL, ERROR_TUTORIAL} from './action.types';

export const getTutorials = () => async (dispatch) => {
  try {
    database()
      .ref('/tutorials/')
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());

        if (snapshot.val()) {
          dispatch({
                 type: SET_TUTORIAL,
                  payload: Object.values(snapshot.val()),
          });
        }
         else
        {
          dispatch({
            type: SET_TUTORIAL,
            payload: [],
          });
        }
      });
  } 
  catch (error) {
    dispatch({
      type: ERROR_TUTORIAL,
    });
  }
};
