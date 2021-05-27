import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout({ children }) {
	return (
		<main className='relative flex flex-col min-h-screen'>
			<Navbar />
			<section className='flex-grow h-full'>{children}</section>
			<Footer />
		</main>
	)
}
