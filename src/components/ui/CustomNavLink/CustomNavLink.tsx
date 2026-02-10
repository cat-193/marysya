import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import './CustomNavLink.scss';

interface CustomNavLinkProps {
	to: string;
	children: React.ReactNode;
	icon?: React.ReactNode;
	className?: string;
	activeClassName?: string;
	variant?: 'default' | 'header' | 'sidebar';
}

function CustomNavLink({
	to,
	children,
	icon,
	className = '',
	activeClassName = 'active',
	variant = 'default',
}: CustomNavLinkProps) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`custom-nav-link custom-nav-link--${variant} ${className} ${
					isActive ? activeClassName : ''
				}`.trim()
			}
		>
			{icon && <span className='custom-nav-link__icon'>{icon}</span>}
			<span className='custom-nav-link__text'>{children}</span>
		</NavLink>
	);
}

export default memo(CustomNavLink);
