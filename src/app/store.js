import { configureStore } from "@reduxjs/toolkit";
import euroReducer from './euroSlice'

export const store = configureStore({
	reducer: {
		euro: euroReducer
	}
})

// store.subscribe(()=> console.log(store.getState().euro.users.anny.countries))
