import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from '../actions/adminActions'

export default function adminReducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case GET_USERS_SUCCESS:
      return {
        ...state,
        usersCount: payload.count,
        users: payload.users,
        loading: false,
      }

    case GET_USERS_FAIL:
      return {
        ...state,
        usersCount: 0,
        users: [],
        loading: false,
        errors: [...state.errors, payload]
      }

    default:
      return state
  }
}