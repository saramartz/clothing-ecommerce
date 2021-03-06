import { createSelector } from 'reselect'

const selectUser = (state) => state.user

export const selectLoggedUser = createSelector([selectUser], (user) => user.loggeduser)
