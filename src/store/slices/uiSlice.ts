import type { TMovie } from '@/types/movie.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
	isAuthModalOpen: boolean;
	authModalMode: 'login' | 'register';
	isRegistrationSuccessModalOpen: boolean;
	isLogoutConfirmModalOpen: boolean;
	isTrailerModalOpen: boolean;
	trailerMovie: TMovie | null;
}

const initialState: UIState = {
	isAuthModalOpen: false,
	authModalMode: 'login',
	isRegistrationSuccessModalOpen: false,
	isLogoutConfirmModalOpen: false,
	isTrailerModalOpen: false,
	trailerMovie: null,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openAuthModal: (state, action: PayloadAction<'login' | 'register'>) => {
			state.isAuthModalOpen = true;
			state.authModalMode = action.payload;
		},
		closeAuthModal: (state) => {
			state.isAuthModalOpen = false;
		},
		setAuthModalMode: (state, action: PayloadAction<'login' | 'register'>) => {
			state.authModalMode = action.payload;
		},
		openRegistrationSuccessModal: (state) => {
			state.isRegistrationSuccessModalOpen = true;
		},
		closeRegistrationSuccessModal: (state) => {
			state.isRegistrationSuccessModalOpen = false;
		},
		openLogoutConfirmModal: (state) => {
			state.isLogoutConfirmModalOpen = true;
		},
		closeLogoutConfirmModal: (state) => {
			state.isLogoutConfirmModalOpen = false;
		},
		openTrailerModal: (state, action: PayloadAction<TMovie>) => {
			state.isTrailerModalOpen = true;
			state.trailerMovie = action.payload;
		},
		closeTrailerModal: (state) => {
			state.isTrailerModalOpen = false;
			state.trailerMovie = null;
		},
	},
});

export const {
	openAuthModal,
	closeAuthModal,
	setAuthModalMode,
	openRegistrationSuccessModal,
	closeRegistrationSuccessModal,
	openLogoutConfirmModal,
	closeLogoutConfirmModal,
	openTrailerModal,
	closeTrailerModal,
} = uiSlice.actions;
export default uiSlice.reducer;
