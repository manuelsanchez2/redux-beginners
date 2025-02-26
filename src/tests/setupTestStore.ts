import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../store/slices/counterSlice"; // Import default reducer
import userReducer, { UserStatus } from "../store/slices/userSlice"; // Import default reducer
import { RootState } from "../store/store";

export function setupCounterStore(preloadedState?: { counter: RootState["counter"] }) {
    return configureStore({
        reducer: { counter: counterReducer },
        preloadedState: preloadedState ?? { counter: { value: 0 } }, // ✅ Ensure initial state is always defined
    });
}

export function setupUserStore(preloadedState?: { user: RootState["user"] }
   ) {
    return configureStore({
        reducer: { user: userReducer },
        preloadedState: preloadedState ?? { user: { isLoggedIn: false, name: "", status: "idle" as UserStatus } }, // ✅ Ensure default matches UserState
    });
}
