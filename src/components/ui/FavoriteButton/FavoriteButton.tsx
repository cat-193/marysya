import { memo, useCallback } from 'react';
import { ICONS } from '../../../constants/icons';
import {
	useFavoriteStatus,
	useToggleFavorite,
} from '../../../hooks/api/favorites/favorites';
import Button from '../Button/Button';

interface FavoriteButtonProps {
	id: number;
}

function FavoriteButton({ id }: FavoriteButtonProps) {
	const { toggleFavorite, isLoading: isFavoriteLoading } = useToggleFavorite();

	const handleFavoriteClick = useCallback(() => {
		toggleFavorite(id);
	}, [toggleFavorite, id]);

	const { isFavorite } = useFavoriteStatus(id);

	return (
		<Button
			className='button-favorite'
			variant='secondary-icon'
			onClick={handleFavoriteClick}
			isLoading={isFavoriteLoading}
		>
			{isFavorite ? ICONS.heartFilled : ICONS.heart}
		</Button>
	);
}

export default memo(FavoriteButton);
