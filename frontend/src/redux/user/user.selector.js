import { createSelector } from 'reselect'
const selectorUser = state => state.user

export const selectUser = createSelector(
    [selectorUser],
    stateUser => stateUser.user
);