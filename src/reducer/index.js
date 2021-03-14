import {combineReducers} from 'redux'
import auth from './auth'
import book from './book'

import tutorial from "./tutorial";
import usertutorial from './usertutorial';
import document from "./document";
export default combineReducers({
    auth,
    book,
    tutorial,
    document,
    usertutorial
  
})