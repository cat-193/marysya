import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
	isAuthenticated: boolean;
}

const getInitialAuthState = (): IAuthState => {
	const token = localStorage.getItem('auth');
	return {
		isAuthenticated: !!token,
	};
};

const authSlice = createSlice({
	name: 'auth',
	initialState: getInitialAuthState(),
	reducers: {
		setAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
			localStorage.setItem('auth', action.payload.toString());
		},
		logout: (state) => {
			state.isAuthenticated = false;
			localStorage.removeItem('auth');
		},
		initializeAuth: (state) => {
			const isAuth = localStorage.getItem('auth');
			state.isAuthenticated = !!isAuth;
		},
	},
});

export const { setAuthenticated, logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;
