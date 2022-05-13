import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import contactReducer from "../features/contacts/contactSlice";
import sessionReducer from "../features/sessions/sessionSlice";
import eventReducer from "../features/events/eventSlice";
import galleryReducer from "../features/gallery/gallerySlice";
import userReducer from "../features/users/userSlice";
import categoryReducer from "../features/categories/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactReducer,
    sessions: sessionReducer,
    events: eventReducer,
    galleries: galleryReducer,
    users: userReducer,
    categories: categoryReducer,
  },
});
