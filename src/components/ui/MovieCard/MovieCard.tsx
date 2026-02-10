import { ICONS } from '@/constants/icons';

import { useAppDispatch } from '@/hooks/redux';
import { openTrailerModal } from '@/store/slices/uiSlice';
import type { TMovie } from '@/types/movie.types';
import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { Loader } from '../Loader/Loader';
import { MovieCharacteristics } from '../MovieCharacteristics/MovieCharacteristics';
import './MovieCard.scss';

interface IMovieCardProps {
	movie: TMovie;
	isLoading?: boolean;
	showRefreshButton?: boolean;
	showAboutButton?: boolean;
	onRefetch?: () => void;
}

function MovieCard({
	movie,
	isLoading = false,
	showRefreshButton = true,
	showAboutButton = true,
	onRefetch,
}: IMovieCardProps) {
	const dispatch = useAppDispatch();

	const handleClick = useCallback(() => {
		dispatch(openTrailerModal(movie));
	}, [dispatch, movie]);

	return (
		<div className='movie-card'>
			<div className='movie-card__left movie-left'>
				<MovieCharacteristics movie={movie} />
				<p className='movie-left__description'>{movie.plot}</p>
				<div className='movie-left__actions'>
					<Button onClick={handleClick}>Трейлер</Button>
					{showAboutButton && (
						<Link to={`/movie/${movie.id}`} className='btn btn--secondary'>
							О фильме
						</Link>
					)}
					<FavoriteButton id={movie.id} />
					{showRefreshButton && onRefetch && (
						<Button
							variant='secondary-icon'
							onClick={onRefetch}
							isLoading={isLoading}
						>
							{ICONS.refresh}
						</Button>
					)}
				</div>
			</div>
			<div className='movie-card__right movie-right'>
				{isLoading ? (
					<Loader />
				) : movie.backdropUrl ? (
					<img
						className='movie-right__img'
						src={movie.backdropUrl}
						alt={`Обложка фильма ${movie.title}`}
					/>
				) : (
					<div className='image-placeholder'>Фото не загружено</div>
				)}
			</div>
		</div>
	);
}

export default memo(MovieCard);
