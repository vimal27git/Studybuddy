import database from '@react-native-firebase/database';
import {SETUSER_TUTORIAL,ERRORUSER_TUTORIAL} from './action.types';

export const getUserTutorials = (data) => async (dispatch) => {
  try {
    database()
      .ref(`/tutorials/`)
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());

        if (snapshot.val()) {
          dispatch({
                 type: SETUSER_TUTORIAL,
                  payload: Object.values(snapshot.val()),
          });
        }
         else
        {
          dispatch({
            type: SETUSER_TUTORIAL,
            payload: [],
          });
        }
      });
  } 
  catch (error) {
    dispatch({
      type: ERRORUSER_TUTORIAL,
    });
  }
};
