import { configureStore } from '@reduxjs/toolkit';
import bankReducer from './bankSlice';

//El reducer banksReducer gestionará el estado de los bancos
const store = configureStore({
  reducer: {
    banks: bankReducer,
  },
});

export default store;
