/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICONS } from '@/constants/icons';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { closeTrailerModal } from '@/store/slices/uiSlice';
import { getTrailerUrl } from '@/utils/getTrailerUrl';
import { useRef, useState } from 'react';
import YouTube, { type YouTubeProps } from 'react-youtube';
import { Loader } from '../Loader/Loader';
import Modal from '../Modal/Modal';
import './TrailerModal.scss';

function TrailerModal() {
	const dispatch = useAppDispatch();
	const { isTrailerModalOpen, trailerMovie } = useAppSelector(
		(state) => state.ui,
	);
	const [isLoading, setIsLoading] = useState(true);
	const [isShowTitle, setIsShowTitle] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const [isHovering, setIsHovering] = useState(false);
	const playerRef = useRef<any | null>(null);

	const handleClose = () => {
		dispatch(closeTrailerModal());
		setIsLoading(true);
	};

	if (!trailerMovie) return null;

	const trailerUrl = getTrailerUrl(
		trailerMovie.trailerUrl,
		trailerMovie.trailerYoutubeId,
	);
	const onPlayerReady = (event: { target: any }) => {
		playerRef.current = event.target;
		setIsLoading(false);
	};

	const handlePause = () => {
		setIsPlaying(false);
		setIsShowTitle(true);
	};

	const handlePlay = () => {
		setIsPlaying(true);
		setIsShowTitle(false);
	};

	const handlePlayButtonClick = () => {
		if (playerRef.current) {
			playerRef.current.playVideo();
		}
	};

	const handlePauseButtonClick = () => {
		if (playerRef.current) {
			playerRef.current.pauseVideo();
		}
	};

	const opts: YouTubeProps['opts'] = {
		height: '100%',
		width: '100%',

		playerVars: {
			autoplay: 1,
			controls: 1,
			iv_load_policy: 3,
			fs: 1,
			rel: 0,
		},
	};

	return (
		<Modal
			isOpen={isTrailerModalOpen}
			onClose={handleClose}
			className='trailer-modal'
		>
			<div className='trailer-modal__content'>
				<div
					className='trailer-modal__video-wrapper'
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
				>
					{isLoading && (
						<div className='trailer-modal__loading'>
							<Loader />
						</div>
					)}
					<YouTube
						videoId={trailerUrl ? trailerUrl : ''}
						opts={opts}
						onReady={onPlayerReady}
						onPause={handlePause}
						onPlay={handlePlay}
						className='trailer-modal__video'
					/>
					{!isPlaying && isHovering && (
						<button
							className='trailer-modal__button'
							onClick={handlePlayButtonClick}
							aria-label='Play video'
						>
							{ICONS.play}
						</button>
					)}
					{isPlaying && isHovering && (
						<button
							className='trailer-modal__button'
							onClick={handlePauseButtonClick}
							aria-label='Pause video'
						>
							{ICONS.pause}
						</button>
					)}
					{isShowTitle && (
						<div className='trailer-modal__header'>
							<h2 className='trailer-modal__title'>{trailerMovie.title}</h2>
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
}

export default TrailerModal;
