import { z } from 'zod';

const nullableString = z.string().nullable().catch('');
const nullableNumber = z.number().nullable().catch(0);
const nullableArray = <T extends z.ZodType>(schema: T) =>
	z.array(schema).nullable().catch([]);

export const movieSchema = z.object({
	id: z.number(),
	title: z.string(),
	originalTitle: nullableString,
	language: nullableString,
	releaseYear: nullableNumber,
	releaseDate: nullableString,
	genres: nullableArray(z.string()),
	plot: nullableString,
	runtime: nullableNumber,
	budget: nullableString,
	revenue: nullableString,
	homepage: nullableString,
	status: nullableString,
	posterUrl: nullableString,
	backdropUrl: nullableString,
	trailerUrl: nullableString,
	trailerYoutubeId: nullableString,
	tmdbRating: z.number().min(0).max(10).nullable().catch(0),
	searchL: nullableString,
	keywords: nullableArray(z.string()),
	countriesOfOrigin: nullableArray(z.string()),
	languages: nullableArray(z.string()),
	cast: nullableArray(z.string()),
	director: nullableString,
	production: nullableString,
	awardsSummary: nullableString,
});

export const genresSchema = z.array(z.string());

export type TGenres = z.infer<typeof genresSchema>;

export type TMovie = z.infer<typeof movieSchema>;
