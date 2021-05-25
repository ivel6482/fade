import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
	return (
		<main className='relative flex flex-col min-h-screen'>
			<section className='flex-grow h-full'>{children}</section>
			<Footer />
		</main>
	)
}
