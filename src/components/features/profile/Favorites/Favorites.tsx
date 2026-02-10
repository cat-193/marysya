import { Loader } from '@/components/ui/Loader/Loader';
import MoviePosterList from '@/components/ui/MoviePoster/MoviePosterList';
import { useFavorites } from '@/hooks/api/favorites/favorites';

function Favorites() {
	const { data = [], isLoading, isError } = useFavorites();

	if (isError) {
		return (
			<section className='favorites'>
				<div className='favorites__empty error-load'>
					Не удалось загрузить избранное
				</div>
			</section>
		);
	}

	return (
		<section className='favorites'>
			{isLoading ? (
				<Loader />
			) : data?.length === 0 ? (
				<div className='favorites__empty error-load'>
					Упс... похоже тут нет фильмов
				</div>
			) : (
				<MoviePosterList data={data} showDelete={true} />
			)}
		</section>
	);
}

export default Favorites;
