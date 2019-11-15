import { createSelector } from 'reselect'
const selectClass = state => state.class

export const selectClassMenuLeft = createSelector(
    [selectClass],
    stateClass => stateClass.menu_left
);