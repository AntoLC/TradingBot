import { createSelector } from 'reselect'
const selectDataSocket = state => state.dataSocket

export const selectResponseSocket = createSelector(
    [selectDataSocket],
    stateDataSocket => stateDataSocket.response_socket
);