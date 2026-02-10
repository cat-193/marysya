import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Layout.scss';

interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<div className='layout'>
			<Header />
			<main className='layout__main'>{children}</main>
			<Footer />
		</div>
	);
}

export default Layout;
