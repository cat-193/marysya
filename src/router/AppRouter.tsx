import { BrowserRouter } from 'react-router-dom';

import { LogoutConfirmModal } from '@/components/features/LogoutModal/LogoutModal';
import Layout from '@/components/layout/Layout/Layout';
import { AnimatedRoutes } from './AnimatedRoutes';
import { Suspense } from 'react';
import { Loader } from '@/components/ui/Loader/Loader';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

const AppRouter = () => {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Layout>
				<ErrorBoundary>
					<Suspense fallback={<Loader />}>
						<AnimatedRoutes />
					</Suspense>
				</ErrorBoundary>
			</Layout>
			<LogoutConfirmModal />
		</BrowserRouter>
	);
};

export default AppRouter;
