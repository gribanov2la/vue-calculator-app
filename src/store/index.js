import Vuex from 'vuex';
import Vue from 'vue';
import actions from './actions';
import mutations from './mutations';
import state from './defaultState';

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	actions,
	mutations
});
