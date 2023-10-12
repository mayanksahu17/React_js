import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice'; // Updated import statement

const store = configureStore({
    reducer: {
        auth: authSlice, // Use authSlice without alias
    }
});

export default store;
