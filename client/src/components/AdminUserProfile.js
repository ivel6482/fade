import { useParams } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'

export default function AdminUserProfile() {
	const { id } = useParams()
	return (
		<DashboardLayout currentTab='users'>
			<h1>user id: {id}</h1>
		</DashboardLayout>
	)
}
