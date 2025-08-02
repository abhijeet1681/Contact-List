import { createSlice } from '@reduxjs/toolkit';
import { DUMMY_DATA } from '../data/dummyData';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: DUMMY_DATA,
  },
  reducers: {
    addContact: (state, action) => {
      const newContact = { id: crypto.randomUUID(), ...action.payload };
      state.data.unshift(newContact);
    },
    updateContact: (state, action) => {
      const index = state.data.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    // --- NEW: Delete Reducer ---
    deleteContact: (state, action) => {
      // The payload will be the id of the contact to delete
      state.data = state.data.filter(contact => contact.id !== action.payload);
    },
  },
});

// Export the new action
export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;