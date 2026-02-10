import { ICONS_SOCIAL } from '@/constants/iconsSocial';
import { SOCIAL_LINKS } from '@/constants/socialLinks';
import { memo } from 'react';
import './Footer.scss';

function Footer() {
	return (
		<footer className='footer'>
			<div className='container'>
				<ul className='footer__social-list'>
					{SOCIAL_LINKS.map(({ key, href }) => (
						<li key={key} className='footer__social-item'>
							<a
								href={href}
								target='_blank'
								rel='noreferrer'
								className='footer__social-link'
							>
								{ICONS_SOCIAL[key]}
							</a>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
}

export default memo(Footer);
