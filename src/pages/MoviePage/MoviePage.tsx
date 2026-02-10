import { Loader } from '@/components/ui/Loader/Loader';
import MovieCard from '@/components/ui/MovieCard/MovieCard';
import MovieDetails from '@/components/ui/MovieDetails/MovieDetails';
import { useMovie } from '@/hooks/api/movie/movie';
import { useParams } from 'react-router-dom';

function MoviePage() {
	const { id } = useParams<{ id: string }>();

	const { data: movie, isPending, isError } = useMovie(Number(id));

	if (isPending) {
		return (
			<div className='container'>
				<Loader />
			</div>
		);
	}

	if (isError || !movie) {
		return (
			<section className='movie-page'>
				<div className='container'>
					<div className='movie-page__error error-load'>Фильм не найден</div>
				</div>
			</section>
		);
	}

	return (
		<section className='movie-page'>
			<div className='container'>
				<MovieCard
					movie={movie}
					isLoading={isPending}
					showRefreshButton={false}
					showAboutButton={false}
				/>
				<MovieDetails movie={movie} />
			</div>
		</section>
	);
}

export default MoviePage;
