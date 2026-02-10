import GenresList from '@/components/features/GenresList/GenresList';
import { memo } from 'react';
import './GenresPage.scss';

function GenresPage() {
	return (
		<section className='genres'>
			<div className='container'>
				<h2 className='genres__title'>Жанры фильмов</h2>
				<GenresList />
			</div>
		</section>
	);
}

export default memo(GenresPage);
