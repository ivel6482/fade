import { useContext, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import User from '../components/User'
import { AdminContext } from '../store/contexts/adminContext'


export default function AdminUsers() {
    const { loading, users, getUsers, usersCount } = useContext(AdminContext)

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <DashboardLayout currentTab='users'>
            <h3 className='font-bold text-gray-300 text-8xl'>Users</h3>
            {
                loading ? (
                    <p>Loading users...</p>
                ) : (
                    <>
                        <p className='mb-4'>Total users: {usersCount}</p>
                        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                            {users.length === 0 ? (
                                <p className='text-gray-500'>
                                    There are  no users.
                                </p>
                            ) : (
                                users.map((user) => {
                                    return <User user={user} key={user._id} />
                                })
                            )}
                        </ul>
                    </>

                )
            }
        </DashboardLayout>
    )
}