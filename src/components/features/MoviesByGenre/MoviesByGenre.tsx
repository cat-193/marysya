import Button from '@/components/ui/Button/Button';
import { Loader } from '@/components/ui/Loader/Loader';
import MoviePosterList from '@/components/ui/MoviePoster/MoviePosterList';
import { ICONS } from '@/constants/icons';
import type { TMovie } from '@/types/movie.types';
import { useNavigate } from 'react-router-dom';
import './MoviesByGenre.scss';

interface IMoviesByGenreProps {
	movies: TMovie[];
	genre: string;
	onLoadMore?: () => void;
	hasMore?: boolean;
	isLoadingMore?: boolean;
}

function MoviesByGenre({
	movies,
	genre,
	onLoadMore,
	hasMore = true,
	isLoadingMore = false,
}: IMoviesByGenreProps) {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);
	return (
		<>
			<Button className='genre__button-back' onClick={goBack} variant='empty'>
				{ICONS.goBackArrow}
				{genre.charAt(0).toUpperCase() + genre.substring(1).toLowerCase()}
			</Button>
			<MoviePosterList data={movies} />
			{hasMore && (
				<div className='genre__show-more-wrapper'>
					<Button
						className='genre__show-more'
						onClick={onLoadMore}
						isLoading={isLoadingMore}
						disabled={isLoadingMore}
					>
						{isLoadingMore ? <Loader /> : 'Показать ещё'}
					</Button>
				</div>
			)}
		</>
	);
}

export default MoviesByGenre;
