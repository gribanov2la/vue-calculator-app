import * as TYPES from '../constants/mutationsTypes';

const mutations = {
	[TYPES.PUSH_HISTORY_ITEMS] (state, payload) {
		state.historyItems.push(...payload.historyItems);
	}
};

export default mutations;
