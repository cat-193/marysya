import Favorites from '@/components/features/profile/Favorites/Favorites';
import Settings from '@/components/features/profile/Settings/Settings';
import { PAGE_ROUTES } from '@/constants/pageRoutes';
import HomePage from '@/pages/HomePage/HomePage';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { lazy } from 'react';

const MoviePage = lazy(() => import('@/pages/MoviePage/MoviePage'));
const GenresPage = lazy(() => import('@/pages/GenresPage/GenresPage'));
const MoviesByGenrePage = lazy(
	() => import('@/pages/MoviesByGenrePage/MoviesByGenrePage'),
);
const ProfilePage = lazy(() => import('@/pages/ProfilePage/ProfilePage'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

export const AnimatedRoutes = () => {
	const location = useLocation();
	// onExitComplete={() => window.scrollTo(0, 0)}
	return (
		<AnimatePresence mode='wait'>
			<motion.div
				key={location.pathname}
				initial={{ opacity: 0, filter: 'blur(10px)' }}
				animate={{ opacity: 1, filter: 'blur(0px)' }}
				exit={{ opacity: 0, filter: 'blur(10px)' }}
				transition={{
					duration: 0.2,
					ease: 'easeInOut',
					filter: { duration: 0.1 },
				}}
			>
				<Routes location={location}>
					<Route path={PAGE_ROUTES.HOME} element={<HomePage />} />
					<Route path={PAGE_ROUTES.MOVIE} element={<MoviePage />} />
					<Route path={PAGE_ROUTES.GENRES} element={<GenresPage />} />
					<Route
						path={PAGE_ROUTES.MOVIES_BY_GENRE}
						element={<MoviesByGenrePage />}
					/>
					<Route
						path={PAGE_ROUTES.PROFILE}
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					>
						<Route
							index
							element={
								<Navigate
									to={`${PAGE_ROUTES.PROFILE}/${PAGE_ROUTES.FAVORITES}`}
									replace
								/>
							}
						/>
						<Route
							path={PAGE_ROUTES.FAVORITES}
							element={
								<ProtectedRoute>
									<Favorites />
								</ProtectedRoute>
							}
						/>
						<Route
							path={PAGE_ROUTES.SETTINGS}
							element={
								<ProtectedRoute>
									<Settings />
								</ProtectedRoute>
							}
						/>
					</Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</motion.div>
		</AnimatePresence>
	);
};
