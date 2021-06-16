import {
	SHOW_NOTIFICATION,
	HIDE_NOTIFICATION,
} from '../actions/notificationsActions'

export default function notificationsReducer(state, action) {
	const { type, payload } = action
	switch (type) {
		case SHOW_NOTIFICATION:
			return {
				notifications: [...state.notifications, payload],
				show: true,
			}

		case HIDE_NOTIFICATION:
			return {
				// notifications: state.notification.filter(
				// 	(notification) => notification.id !== payload
				// ),
				notifications: [],
				show: false,
			}

		default:
			return state
	}
}
