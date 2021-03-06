import { UserActionTypes } from './user.types'

const INITIAL_STATE = {
    loggeduser: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_LOGGED_USER:
            return {
                ...state,
                loggeduser: action.payload,
            }
        default:
            return state
    }
}

export default userReducer
