import Input from '@/components/ui/Input/Input';
import { useSearchMovies } from '@/hooks/api/movie/movie';
import { useDebounce } from '@/hooks/useDebounce';
import { memo, useCallback, useRef, useState } from 'react';
import SearchModal from '../SearchModal/SearchModal';

function SearchMovie() {
	const [query, setQuery] = useState('');
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const debouncedQuery = useDebounce(query, 300);
	const inputRef = useRef<HTMLInputElement>(null);

	const {
		data: movies,
		isLoading,
		isFetching,
	} = useSearchMovies(debouncedQuery, isSearchOpen);

	const closeSearch = useCallback(() => {
		setIsSearchOpen(false);
		setQuery('');
	}, []);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setQuery(value);

			if (value.length > 0 && !isSearchOpen) {
				setIsSearchOpen(true);
			}

			if (value.length === 0 && isSearchOpen) {
				setIsSearchOpen(false);
			}
		},
		[isSearchOpen],
	);

	return (
		<>
			<Input
				ref={inputRef}
				name='search'
				className='header__nav-search'
				placeholder='Поиск'
				value={query}
				onChange={handleInputChange}
				type='search'
			/>
			{query.length > 0 ? (
				<SearchModal
					isOpen={isSearchOpen}
					onClose={closeSearch}
					initialQuery={query}
					movies={movies}
					isLoading={isLoading}
					isFetching={isFetching}
					searchInputRef={inputRef}
				/>
			) : null}
		</>
	);
}

export default memo(SearchMovie);
