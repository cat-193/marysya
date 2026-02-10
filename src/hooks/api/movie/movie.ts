import { useQuery } from '@tanstack/react-query';
import { movieKeys, moviesApi } from '../../../services/api/movie';

export const useRandomMovie = () => {
	return useQuery({
		queryKey: movieKeys.random(),
		queryFn: moviesApi.getRandomMovie,
		staleTime: 5 * 60 * 1000,
	});
};

export const useTopMovies = () => {
	return useQuery({
		queryKey: movieKeys.top(),
		queryFn: moviesApi.getTopTenMovies,
		staleTime: 10 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
	});
};

export const useMovie = (id: number) => {
	return useQuery({
		queryKey: movieKeys.movie(id),
		queryFn: () => moviesApi.getMovieById(id),
		enabled: !!id,
	});
};

export const useGenres = () => {
	return useQuery({
		queryKey: movieKeys.genres(),
		queryFn: moviesApi.getGenres,
		gcTime: 1000 * 60 * 60 * 24 * 30,
		staleTime: 1000 * 60 * 60 * 24 * 7,
	});
};

export const useMoviesByGenre = (genre: string) => {
	return useQuery({
		queryKey: movieKeys.movies_by_genre(genre),
		queryFn: () => moviesApi.getByGenre(genre),
		enabled: !!genre,
		staleTime: 1000 * 60 * 10,
	});
};

export const useSearchMovies = (query: string, enabled: boolean = true) => {
	return useQuery({
		queryKey: movieKeys.search(query),
		queryFn: () => moviesApi.getSearchMovies(query),
		enabled: enabled,
		staleTime: 1000 * 60,
		gcTime: 1000 * 60 * 5,
	});
};
