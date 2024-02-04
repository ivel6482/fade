export const BarbershopItem = ({ icon, text }) => {
	return (
		<section>
			<p className='flex items-center space-x-2'>
				{icon}
				<span>{text}</span>
			</p>
		</section>
	)
}
