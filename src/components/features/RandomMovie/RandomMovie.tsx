import Button from '@/components/ui/Button/Button';
import { Loader } from '@/components/ui/Loader/Loader';
import MovieCard from '@/components/ui/MovieCard/MovieCard';
import { useRandomMovie } from '@/hooks/api/movie/movie';
import { memo, useCallback } from 'react';
import './RandomMovie.scss';

function RandomMovie() {
	const {
		isFetching,
		isPending,
		data: movie,
		error,
		refetch,
	} = useRandomMovie();

	const handleRefresh = useCallback(() => {
		refetch();
	}, [refetch]);

	if (error || !movie) {
		return (
			<section className='random-movie'>
				<div className='random-movie__error'>
					<p className='random-movie__error-text'>Не удалось загрузить фильм</p>
					<Button onClick={handleRefresh}>Попробовать снова</Button>
				</div>
			</section>
		);
	}

	return (
		<section className='random-movie'>
			{isPending ? (
				<Loader />
			) : (
				<MovieCard movie={movie} isLoading={isFetching} onRefetch={refetch} />
			)}
		</section>
	);
}

export default memo(RandomMovie);
