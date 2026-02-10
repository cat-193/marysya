import type { TMovie } from '@/types/movie.types';
import { memo, useMemo } from 'react';
import MoviePoster from './MoviePoster';
import './MoviePosterList.scss';

interface IMoviePosterListProps {
	data: TMovie[];
	showDelete?: boolean;
	showRank?: boolean;
}

function MoviePosterList({
	data,
	showDelete = false,
	showRank = false,
}: IMoviePosterListProps) {
	const postersList = useMemo(() => {
		return data.map((movie, index) => (
			<MoviePoster
				movie={movie}
				key={movie.id}
				showDelete={showDelete}
				showRank={showRank}
				rank={index + 1}
			/>
		));
	}, [data, showDelete, showRank]);

	return <ul className='movie-poster-list'>{postersList}</ul>;
}

export default memo(MoviePosterList);
