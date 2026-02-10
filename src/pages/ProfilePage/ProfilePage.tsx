import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import CustomNavLink from '../../components/ui/CustomNavLink/CustomNavLink';
import { ICONS } from '../../constants/icons';
import { PAGE_ROUTES } from '../../constants/pageRoutes';
import './ProfilePage.scss';

function ProfilePage() {
	return (
		<section className='profile'>
			<div className='container profile__container'>
				<h2 className='profile__title'>Мой аккаунт</h2>

				<nav className='profile__nav'>
					<CustomNavLink
						icon={ICONS.heart}
						to={`${PAGE_ROUTES.PROFILE}/${PAGE_ROUTES.FAVORITES}`}
					>
						Избранные фильмы
					</CustomNavLink>
					<CustomNavLink
						icon={ICONS.settings}
						to={`${PAGE_ROUTES.PROFILE}/${PAGE_ROUTES.SETTINGS}`}
					>
						Настройка аккаунта
					</CustomNavLink>
				</nav>

				<div className='profile__content'>
					<Outlet />
				</div>
			</div>
		</section>
	);
}

export default memo(ProfilePage);
