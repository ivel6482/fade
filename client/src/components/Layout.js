export default function Layout({ children }) {
	return (
		<div className='flex min-h-screen bg-white'>
			<div className='flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
				<div className='w-full max-w-sm mx-auto lg:w-96'>{children}</div>
			</div>
			<div className='relative flex-1 hidden w-0 lg:block'>
				<img
					className='absolute inset-0 object-cover w-full h-full'
					src='https://images.unsplash.com/photo-1573588546512-2ace898aa480?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80'
					alt='barbershop'
				/>
			</div>
		</div>
	)
}
