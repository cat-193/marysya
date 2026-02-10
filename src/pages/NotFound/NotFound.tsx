// pages/NotFound.tsx
import Button from '@/components/ui/Button/Button';
import { PAGE_ROUTES } from '@/constants/pageRoutes';
import { Link, useNavigate } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);
	return (
		<section className='not-found'>
			<div className='not-found__content container'>
				<div className='not-found__number'>404</div>
				<h2 className='not-found__title'>Страница не найдена</h2>
				<p className='not-found__description'>
					Возможно, эта страница была удалена или вы ввели неправильный адрес.
				</p>
				<div className='not-found__actions'>
					<Link to={PAGE_ROUTES.HOME} className='not-found__link'>
						<Button>На главную</Button>
					</Link>
					<Button variant='secondary' onClick={goBack}>
						Назад
					</Button>
				</div>
			</div>
		</section>
	);
}

export default NotFound;
