import { combineReducers } from 'redux';
import auth from './auth';
import book from './books';
import getGenre from './getGenre';
import getAuthor from './getAuthor';
import getHistory from './getHistory';
import borrow from './borrowBook';
import returnTheBook from './returnBook';
import logOut from './logout';


export default combineReducers({ book, auth , getGenre, getAuthor, borrow, returnTheBook, getHistory, logOut });