/* This example requires Tailwind CSS v2.0+ */
export const SquareBadge = ({ color, text = 'Badge' }) => {
	switch (color) {
		case 'red':
			return (
				<span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800'>
					{text}
				</span>
			)

		case 'yellow':
			return (
				<span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-800'>
					{text}
				</span>
			)

		case 'green':
			return (
				<span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800'>
					{text}
				</span>
			)

		case 'blue':
			return (
				<span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800'>
					{text}
				</span>
			)

		case 'indigo':
			return (
				<span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-800'>
					{text}
				</span>
			)

		case 'purple':
			return (
				<span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800'>
					{text}
				</span>
			)

		case 'pink':
			return (
				<span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-pink-100 text-pink-800'>
					{text}
				</span>
			)

		default:
			return (
				<span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-800'>
					{text}
				</span>
			)
	}
}
