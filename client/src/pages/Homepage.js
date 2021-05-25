import { Link } from 'react-router-dom'

export default function Homepage() {
	return (
		<>
			<h1 className='text-6xl'>Homepage</h1>
			<Link to='/signup'>Signup</Link>
		</>
	)
}
