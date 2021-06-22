import DashboardLayout from '../components/DashboardLayout'
import User from '../components/User'


export default function AdminUsers() {
    const users = [
        {
            _id: 1,
            name: 'Machupin1'
        },
        {
            _id: 2,
            name: 'Machupin2'
        },
        {
            _id: 3,
            name: 'Machupin3'
        },
    ]
    return (
        <DashboardLayout currentTab='users'>
            <h3 className='font-bold text-gray-300 text-8xl'>Users</h3>
            <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {users.length === 0 ? (
                    <p className='text-gray-500'>
                        This barbershop currently has no barbers.
                    </p>
                ) : (
                    users.map((user) => {
                        return <User user={user} key={user._id} />
                    })
                )}
            </ul>
        </DashboardLayout>
    )
}