import PouchApi from '../api/PouchApi';
import * as TYPES from '../constants/actionTypes';
import * as MUTATIONS_TYPES from '../constants/mutationsTypes';

const pouchApi = new PouchApi('http://127.0.0.1:5984/history');

const actions = {
	[TYPES.PUT_HISTORY_ITEM](context, payload) {
		return pouchApi.putHistoryItem(payload.historyItem);
	},
	[TYPES.FETCH_HISTORY_ITEMS]({commit}) {
		return pouchApi.fetchHistoryItems().then(historyItems => commit(MUTATIONS_TYPES.PUSH_HISTORY_ITEMS, {historyItems}))
	},
	[TYPES.SUBSCRIBE_HISTORY_ITEMS_CHANGES]({commit}) {
		return pouchApi.createChanges()
			.on('change', (change) => commit(MUTATIONS_TYPES.PUSH_HISTORY_ITEMS, {historyItems: [change.doc.message]}));
	}
};

export default actions;
