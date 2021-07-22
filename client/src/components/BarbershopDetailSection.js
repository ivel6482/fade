export default function BarbershopDetailSection({ children, title }) {
	return (
		<section className='pb-8 mt-8'>
			<div className='pb-5 mb-3 border-b border-gray-200'>
				<h3 className='text-lg font-semibold leading-6 text-gray-900'>
					{title}
				</h3>
			</div>
			<div className='text-gray-500'>{children}</div>
		</section>
	)
}
