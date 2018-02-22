import Vue from 'vue';
import Router from 'vue-router';
import AppTable from '../components/AppTable.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'AppTable',
			component: AppTable
		}
	],
	mode: 'history',
});
