import { UserActionTypes } from './user.types'

export const setLoggedUser = (user) => ({
    type: UserActionTypes.SET_LOGGED_USER,
    payload: user,
})
