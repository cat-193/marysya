import { Loader } from '@/components/ui/Loader/Loader';
import MoviePosterList from '@/components/ui/MoviePoster/MoviePosterList';
import { useTopMovies } from '@/hooks/api/movie/movie';
import { memo } from 'react';
import './TopMovies.scss';

function TopMovies() {
	const { data = [], isLoading, isError } = useTopMovies();

	return (
		<section className='top-movies'>
			<h2 className='top-movies__title'>Топ 10 фильмов</h2>
			{isError ? (
				<p className='top-movies__error error-load'>Ошибка загрузки</p>
			) : isLoading ? (
				<Loader />
			) : (
				<MoviePosterList data={data} showRank={true} />
			)}
		</section>
	);
}

export default memo(TopMovies);
