import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import contactReducer from "../features/contacts/contactSlice";
import sessionReducer from "../features/sessions/sessionSlice";
import eventReducer from "../features/events/eventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactReducer,
    sessions: sessionReducer,
    events: eventReducer,
  },
});
