import { Loader } from '@/components/ui/Loader/Loader';

import Button from '@/components/ui/Button/Button';
import { useUser } from '@/hooks/api/auth/useUser';
import { useAppDispatch } from '@/hooks/redux';
import { openLogoutConfirmModal } from '@/store/slices/uiSlice';
import { getFioShort } from '@/utils/getFioShort';
import './Settings.scss';
import MailIcon from '/mail.svg';

function Settings() {
	const dispatch = useAppDispatch();

	const handleLogoutClick = () => {
		dispatch(openLogoutConfirmModal());
	};

	const { user, isLoading } = useUser();
	return (
		<div className='settings'>
			<ul className='settings__user-data'>
				<li className='settings__item'>
					<span className='settings__item-icon'>
						{isLoading ? <Loader /> : getFioShort(user?.name, user?.surname)}
					</span>
					<div className='settings__item-content'>
						<h3 className='settings__item-title'>Имя Фамилия</h3>
						<span className='settings__item-value'>
							{isLoading ? (
								<Loader />
							) : (
								<span>
									{user?.name} {user?.surname}
								</span>
							)}
						</span>
					</div>
				</li>
				<li className='settings__item'>
					<span className='settings__item-icon'>
						<img src={MailIcon} alt='' />
					</span>
					<div className='settings__item-content'>
						<h3 className='settings__item-title'>Электронная почта</h3>
						<span className='settings__item-value'>
							{isLoading ? <Loader /> : <span>{user?.email}</span>}
						</span>
					</div>
				</li>
			</ul>

			<Button onClick={handleLogoutClick} className='settings__logout-button'>
				Выйти из аккаунта
			</Button>
		</div>
	);
}

export default Settings;
