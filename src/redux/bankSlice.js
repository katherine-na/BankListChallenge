import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// fetchBanks es un thunk que realiza una solicitud para obtener los bancos
export const fetchBanks = createAsyncThunk('banks/fetchBanks', async () => {
  const response = await axios.get('https://dev.obtenmas.com/catom/api/challenge/banks');
  return response.data;
});

const bankSlice = createSlice({
  name: 'banks',
  initialState: {
    banks: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setBanks: (state, action) => {
      state.banks = action.payload;
    },
  },
  //Manejo de los diferentes estados de la solicitud de datos
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banks = action.payload;
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setBanks } = bankSlice.actions;

export default bankSlice.reducer;
