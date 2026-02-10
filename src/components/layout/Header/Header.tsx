import SearchMovie from '@/components/features/SearchMovie/SearchMovie';
import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_ROUTES } from '../../../constants/pageRoutes';
import { useUser } from '../../../hooks/api/auth/useUser';
import { useAppDispatch } from '../../../hooks/redux';
import { useScroll } from '../../../hooks/scroll/useScroll';
import { openAuthModal } from '../../../store/slices/uiSlice';
import Button from '../../ui/Button/Button';
import CustomNavLink from '../../ui/CustomNavLink/CustomNavLink';
import { Loader } from '../../ui/Loader/Loader';
import './Header.scss';
import logo from '/logo.svg';

function Header() {
	const dispatch = useAppDispatch();
	const { user, isAuthenticated, isLoading } = useUser();
	const isScrolled = useScroll();

	const handleLogin = useCallback(() => {
		dispatch(openAuthModal('login'));
	}, [dispatch]);

	return (
		<>
			<header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
				<div className='container'>
					<div className='header__content'>
						<Link to={PAGE_ROUTES.HOME} className='header__logo-link'>
							<img src={logo} alt='logo' />
						</Link>

						<nav className='header__nav'>
							<CustomNavLink to={PAGE_ROUTES.HOME}>Главная</CustomNavLink>
							<CustomNavLink to={PAGE_ROUTES.GENRES}>Жанры</CustomNavLink>
							<SearchMovie />
						</nav>

						{isLoading ? (
							<Loader />
						) : isAuthenticated ? (
							<CustomNavLink
								to={PAGE_ROUTES.PROFILE}
								className='header__profile-link'
							>
								{user?.name || <Loader />}
							</CustomNavLink>
						) : (
							<Button
								className='header__login'
								variant='empty'
								onClick={handleLogin}
							>
								Войти
							</Button>
						)}
					</div>
				</div>
			</header>
		</>
	);
}

export default memo(Header);
