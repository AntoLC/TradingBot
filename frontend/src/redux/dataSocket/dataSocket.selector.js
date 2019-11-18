import { createSelector } from 'reselect'
const selectDataSocket = state => state.dataSocket

export const selectChart = createSelector(
    [selectDataSocket],
    stateDataSocket => stateDataSocket.data_chart
);

export const isSocketReady = createSelector(
    [selectDataSocket],
    stateDataSocket => stateDataSocket.is_socket_ready
);

