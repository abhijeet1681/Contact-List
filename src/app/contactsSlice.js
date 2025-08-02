import { createSlice } from '@reduxjs/toolkit';
import { DUMMY_DATA } from '../data/dummyData';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: DUMMY_DATA,
  },
  reducers: {
    addContact: (state, action) => {
      // Add a unique ID to the new contact
      const newContact = { id: crypto.randomUUID(), ...action.payload };
      state.data.unshift(newContact);
    },
    updateContact: (state, action) => {
      const index = state.data.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export const { addContact, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;