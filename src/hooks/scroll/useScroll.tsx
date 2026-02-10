import { useEffect, useState } from 'react';
import { throttle } from '../../utils/throttle';

export const useScroll = (threshold: number = 50): boolean => {
	const [isScrolled, setIsScrolled] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			setIsScrolled(scrollTop > threshold);
		};

		const throttledScroll = throttle(handleScroll, 100);

		window.addEventListener('scroll', throttledScroll);
		return () => window.removeEventListener('scroll', throttledScroll);
	}, [threshold]);

	return isScrolled;
};
