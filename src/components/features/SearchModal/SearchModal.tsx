import { Loader } from '@/components/ui/Loader/Loader';
import { MovieCharacteristics } from '@/components/ui/MovieCharacteristics/MovieCharacteristics';
import type { TMovie } from '@/types/movie.types';
import { memo, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SearchModal.scss';

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
	initialQuery: string;
	movies?: TMovie[];
	isLoading: boolean;
	isFetching: boolean;
	searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

function SearchModal({
	isOpen,
	onClose,
	initialQuery,
	movies,
	isLoading,
	isFetching,
	searchInputRef,
}: SearchModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	const handleClick = useCallback(() => {
		onClose();
	}, [onClose]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				searchInputRef?.current &&
				searchInputRef.current.contains(e.target as Node)
			) {
				return;
			}

			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose, searchInputRef]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

	return (
		<div className='search-modal' ref={modalRef}>
			<div className='search-modal__results'>
				{isLoading || isFetching ? (
					<div className='search-modal__loading'>
						<Loader />
					</div>
				) : movies && movies.length > 0 ? (
					<ul className='search-modal__list'>
						{movies.slice(0, 5).map((movie) => (
							<li
								key={movie.id}
								className='search-modal__item'
								onClick={handleClick}
							>
								<Link to={`/movie/${movie.id}`} className='search-modal__link'>
									<div className='search-modal__movie'>
										{isLoading ? (
											<Loader />
										) : movie.posterUrl ? (
											<img
												src={movie.posterUrl}
												alt={movie.title}
												className='search-modal__poster'
											/>
										) : (
											<div className='image-placeholder image-placeholder--small'>
												Н/Д
											</div>
										)}
									</div>
									<MovieCharacteristics movie={movie} size='small' />
								</Link>
							</li>
						))}
					</ul>
				) : initialQuery.length >= 2 ? (
					<div className='search-modal__empty'>
						Фильмы по запросу "{initialQuery}" не найдены
					</div>
				) : null}
			</div>
		</div>
	);
}

export default memo(SearchModal);
