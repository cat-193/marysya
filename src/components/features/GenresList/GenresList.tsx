import { API_ROUTES } from '@/constants/apiRoutes';
import { useGenres } from '@/hooks/api/movie/movie';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../ui/Loader/Loader';
import './GenresList.scss';

function GenresList() {
	const { data, isError, isLoading } = useGenres();

	if (isError) {
		return (
			<div className='genres__error'>
				<p className='error-load'>Ошибка загрузки жанров</p>
			</div>
		);
	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<ul className='genres__list'>
					{data?.map((genre) => (
						<li className='genres__item' key={crypto.randomUUID()}>
							<Link
								to={API_ROUTES.MOVIES_BY_GENRE(genre)}
								className='genres__link'
							>
								{genre}
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	);
}

export default memo(GenresList);
