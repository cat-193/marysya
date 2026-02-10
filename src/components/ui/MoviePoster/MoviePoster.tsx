import { ICONS } from '@/constants/icons';
import { useRemoveFromFavorites } from '@/hooks/api/favorites/favorites';
import type { TMovie } from '@/types/movie.types';
import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './MoviePoster.scss';

interface IMoviePosterProps {
	movie: TMovie;
	showDelete?: boolean;
	showRank: boolean;
	rank?: number;
}

function MoviePoster({
	movie,
	showDelete = false,
	showRank = false,
	rank,
}: IMoviePosterProps) {
	const removeMutation = useRemoveFromFavorites();

	const onDelete = useCallback(
		(id: number) => {
			removeMutation.mutate(id);
		},
		[removeMutation],
	);

	return (
		<li className='movie-poster' key={movie.id}>
			<Link to={`/movie/${movie.id}`}>
				{movie.posterUrl ? (
					<img className='movie-poster__image' src={movie.posterUrl} alt='' />
				) : (
					<div className='image-placeholder'>{movie.title}</div>
				)}
				{showRank && rank && <div className='movie-poster__rank'>{rank}</div>}
			</Link>
			{showDelete && (
				<button
					onClick={() => onDelete(movie.id)}
					className='movie-poster__delete'
				>
					{ICONS.cross}
				</button>
			)}
		</li>
	);
}

export default memo(MoviePoster);
