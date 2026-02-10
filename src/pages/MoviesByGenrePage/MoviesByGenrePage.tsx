import MoviesByGenre from '@/components/features/MoviesByGenre/MoviesByGenre';
import { Loader } from '@/components/ui/Loader/Loader';
import { useMoviesByGenre } from '@/hooks/api/movie/movie';
import { memo, useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function MoviesByGenrePage() {
	const [visibleCount, setVisibleCount] = useState(10);
	const ITEMS_PER_PAGE = 10;

	const [searchParams] = useSearchParams();
	const genre = searchParams.get('genre') || '';

	const {
		data: movies = [],
		isError,
		isLoading,
		isFetching,
	} = useMoviesByGenre(genre);

	const visibleMovies = useMemo(() => {
		return movies.slice(0, visibleCount);
	}, [movies, visibleCount]);

	const hasMore = useMemo(() => {
		return visibleCount < movies.length;
	}, [visibleCount, movies.length]);

	const loadMore = useCallback(() => {
		setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
	}, []);

	if (isError) {
		return (
			<section className='movies-by-genre'>
				<div className='container'>
					<div className='error-load'>Ошибка загрузки фильмов</div>
				</div>
			</section>
		);
	}

	if (isLoading) {
		return (
			<section className='movies-by-genre'>
				<div className='container'>
					<Loader />
				</div>
			</section>
		);
	}

	if (movies.length === 0) {
		return (
			<section className='movies-by-genre'>
				<div className='container'>
					<div className='error-load'>Фильмы не найдены</div>
				</div>
			</section>
		);
	}

	return (
		<section className='movies-by-genre'>
			<div className='container'>
				<MoviesByGenre
					movies={visibleMovies}
					genre={genre}
					onLoadMore={loadMore}
					hasMore={hasMore}
					isLoadingMore={isFetching}
				/>
			</div>
		</section>
	);
}

export default memo(MoviesByGenrePage);
