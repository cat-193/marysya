import type { TMovie } from '@/types/movie.types';
import { getLanguageName } from '@/utils/getLanguageName';
import './MovieDetails.scss';

interface IMovieDetails {
	movie: TMovie;
}

function MovieDetails({ movie }: IMovieDetails) {
	return (
		<section className='movie-details'>
			<h2 className='movie-details__title'>О фильме</h2>
			<ul className='movie-details__list'>
				<li className='movie-details__item'>
					<span className='movie-details__label'>Язык оригинала</span>
					<span className='movie-details__value'>
						{getLanguageName(movie.language)}
					</span>
				</li>
				<li className='movie-details__item'>
					<span className='movie-details__label'>Бюджет</span>
					<span className='movie-details__value'>
						{movie.budget
							? `${Number(movie.budget).toLocaleString('ru-RU')} $`
							: 'Неизвестно'}
					</span>
				</li>
				<li className='movie-details__item'>
					<span className='movie-details__label'>Выручка</span>
					<span className='movie-details__value'>
						{movie.revenue
							? `${Number(movie.revenue).toLocaleString('ru-RU')} $`
							: 'Неизвестно'}
					</span>
				</li>
				<li className='movie-details__item'>
					<span className='movie-details__label'>Продакшен</span>
					<span className='movie-details__value'>
						{movie.production ? movie.production : 'Неизвестно'}
					</span>
				</li>
				<li className='movie-details__item'>
					<span className='movie-details__label'>Режиссер</span>
					<span className='movie-details__value'>
						{movie.director ? movie.director : 'Неизвестно'}
					</span>
				</li>
				<li className='movie-details__item'>
					<span className='movie-details__label'>Награды</span>
					<span className='movie-details__value'>
						{movie.awardsSummary ? movie.awardsSummary : 'Неизвестно'}
					</span>
				</li>
			</ul>
		</section>
	);
}

export default MovieDetails;
