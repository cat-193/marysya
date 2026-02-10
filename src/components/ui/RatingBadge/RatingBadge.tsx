import { memo } from 'react';
import { ICONS } from '../../../constants/icons';
import { getRatingColor } from '../../../utils/getRatingColor';
import './RatingBadge.scss';

interface RatingBadgeProps {
	rating: number | null;
	className?: string;
	size?: string;
}

function RatingBadge({ rating, className = '', size }: RatingBadgeProps) {
	return (
		<div
			className={`rating-badge rating-badge--${size} rating-badge--${rating ? getRatingColor(rating) : 'no-rating'} ${className}`}
		>
			{ICONS.star}
			{rating ? rating.toFixed(1) : 'Н/Д'}
		</div>
	);
}

export default memo(RatingBadge);
