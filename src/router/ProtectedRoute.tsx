import { PAGE_ROUTES } from '@/constants/pageRoutes';
import { useAppSelector } from '@/hooks/redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	if (!isAuthenticated) {
		return <Navigate to={PAGE_ROUTES.HOME} replace />;
	}

	return <>{children}</>;
};
