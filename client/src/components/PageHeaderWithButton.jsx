export const PageHeaderWithButton = ({
	title = 'Title',
	button = 'Button',
	onClick = () => alert('Button clicked!'),
	icon,
}) => {
	return (
		<div className='flex items-center justify-between pb-5 mb-5 border-b border-gray-200'>
			<h3 className='text-lg font-medium leading-6 text-gray-900'>{title}</h3>
			<div className='mt-3 sm:mt-0 sm:ml-4'>
				<button
					type='button'
					onClick={onClick}
					className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-200 bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
				>
					{icon ? icon : ''} {button}
				</button>
			</div>
		</div>
	)
}
