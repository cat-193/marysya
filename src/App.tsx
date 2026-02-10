import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from './hooks/redux';
import { QueryProvider } from './provider/QueryProvider';
import AppRouter from './router/AppRouter';
import { initializeAuth } from './store/slices/authSlice';
import AuthModal from './components/features/AuthModal/AuthModal';
import TrailerModal from './components/ui/TrailerModal/TrailerModal';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initializeAuth());
	}, [dispatch]);
	return (
		<QueryProvider>
			<AppRouter />
			<AuthModal />
			<TrailerModal />
			<ToastContainer
				position='bottom-right'
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme='dark'
				limit={3}
			/>
		</QueryProvider>
	);
}
export default App;
