import RandomMovie from '@/components/features/RandomMovie/RandomMovie';
import TopMovies from '@/components/features/TopMovies/TopMovies';

function HomePage() {
	return (
		<div className='container'>
			<RandomMovie />
			<TopMovies />
		</div>
	);
}

export default HomePage;
