import type { TMovie } from '@/types/movie.types';
import { formatRuntime } from '@/utils/formatRuntime';
import { memo, useMemo } from 'react';
import RatingBadge from '../RatingBadge/RatingBadge';
import './MovieCharacteristics.scss';

interface IMovieCharacteristicsProps {
	movie: TMovie;
	size?: string;
}

export const MovieCharacteristics = memo(
	({ movie, size }: IMovieCharacteristicsProps) => {
		const genresText = useMemo(() => {
			return movie.genres?.join(', ') || '';
		}, [movie.genres]);

		return (
			<div className={`movie-characteristics movie-characteristics--${size}`}>
				<div className='movie-characteristics__wrapper'>
					<RatingBadge rating={movie.tmdbRating} size={size} />
					<div className='movie-characteristics__year'>{movie.releaseYear}</div>
					<div className='movie-characteristics__genre'>{genresText}</div>
					<div className='movie-characteristics__duration'>
						{movie.runtime && formatRuntime(movie.runtime)}
					</div>
				</div>
				<h1 className='movie-characteristics__title'>{movie.title}</h1>
			</div>
		);
	},
);

MovieCharacteristics.displayName = 'MovieCharacteristics';
