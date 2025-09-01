import { accessLocalStorage } from "@/utils/accessLocalStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
}

// Get the initial state from localStorage
const getInitialAuthState = (): AuthState => {
    const storedUser = accessLocalStorage.get('authUser');
    return {
        isAuthenticated: !!storedUser,
        user: storedUser ? JSON.parse(storedUser) : null
    }
}

const initialState: AuthState = getInitialAuthState()

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
            state.isAuthenticated = true;
            accessLocalStorage.set('authUser', JSON.stringify(action.payload))
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
            accessLocalStorage.remove('authUser')
        }
    }
});

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer