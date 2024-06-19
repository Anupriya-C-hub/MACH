import { configureStore } from '@reduxjs/toolkit';
import replacementReducer from './replacementslice.js';
import { combineReducers } from 'redux';
import usersReducer from './talentReducer';

const store = configureStore({
  reducer: {
    replacement: replacementReducer,
    users: usersReducer,
   
  },
});

export default store;
