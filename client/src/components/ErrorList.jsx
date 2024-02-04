import { XCircleIcon } from '@heroicons/react/solid'
import ErrorMessage from './ErrorMessage'

export const ErrorList = ({ errors }) => {
	return (
		<div
			className={`p-4 mb-4 rounded-md bg-red-50 transition ${errors.length === 0 ? 'hidden' : 'block'
				}`}
		>
			<div className='flex'>
				<div className='flex-shrink-0'>
					<XCircleIcon className='w-5 h-5 text-red-400' aria-hidden='true' />
				</div>
				<div className='ml-3'>
					<h3 className='text-sm font-semibold text-red-800'>
						There{' '}
						{errors.length === 1 ? ` was 1 error ` : ` were ${errors.length} `}{' '}
						errors with your submission
					</h3>
					<div className='mt-2 text-sm text-red-700'>
						<ul className='pl-5 space-y-1 list-disc'>
							{errors.map((error) => (
								<ErrorMessage key={error} error={error} />
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
