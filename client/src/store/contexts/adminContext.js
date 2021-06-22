import axios from 'axios'
import { createContext, useReducer } from 'react'
import adminReducer from '../reducers/adminReducer'
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from '../actions/adminActions'

const inititalState = {
  usersCount: 0,
  users: [],
  user: null,
  barbers: [],
  barber: null,
  barbershops: [],
  barbershop: null,
  appointments: [],
  appointment: null,
  loading: false,
  errors: []
}

export const AdminContext = createContext()
const { Provider } = AdminContext

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, inititalState)
  const {
    usersCount,
    users,
    user,
    barbers,
    barber,
    barbershops,
    barbershop,
    appointments,
    appointment,
    loading,
    errors,
  } = state

  const getUsers = async () => {
    try {
      dispatch({ type: GET_USERS_REQUEST })
      const res = await axios.get('/users')
      dispatch({
        type: GET_USERS_SUCCESS, payload: {
          count: res.data.count,
          users: res.data.users,
        }
      })
    } catch (error) {
      console.error(error)
      dispatch({ type: GET_USERS_FAIL, payload: error.response.data.message })
    }
  }

  return (
    <Provider value={{
      usersCount,
      users,
      user,
      barbers,
      barber,
      barbershops,
      barbershop,
      appointments,
      appointment,
      loading,
      errors,
      getUsers,
    }}>
      {children}
    </Provider>
  )
}