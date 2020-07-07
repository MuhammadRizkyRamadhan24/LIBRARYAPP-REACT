import { combineReducers } from 'redux';
import auth from './auth';
import getData from './getData';
import addData from './addData';

export default combineReducers({ auth,getData,addData });
