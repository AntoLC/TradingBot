import { createSelector } from 'reselect'
const selectDataSocket = state => state.dataSocket

export const selectChartTop = createSelector(
    [selectDataSocket],
    stateDataSocket => stateDataSocket.data_chart_top
);