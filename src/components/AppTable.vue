<template>
	<div class="table">
		<div class="column">
			<Calculator v-bind:calculate-callback="calculateCallback"/>
		</div>
		<div class="column">
			<History v-bind:items="historyItems"/>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import {PUT_HISTORY_ITEM, FETCH_HISTORY_ITEMS, SUBSCRIBE_HISTORY_ITEMS_CHANGES} from '../constants/actionTypes';
	import Calculator from './Calculator/Calculator.vue';
	import History from './History/History.vue';
	import moment from 'moment';

	@Component({
		components: {Calculator, History}
	})
	export default class AppTable extends Vue {
		historyItemsChanges = null;

		created() {
			this.$store.dispatch(FETCH_HISTORY_ITEMS);
			this.historyItemsChanges = this.$store.dispatch(SUBSCRIBE_HISTORY_ITEMS_CHANGES);
		}

		destroyed() {
			this.historyItemsChanges.cancel();
		}

		get historyItems() {
			return this.$store.state.historyItems;
		}

		calculateCallback(query, result) {
			let time = moment().format('YYYY-MM-DD HH-mm-ss');
			let historyItem = `${time} | ${query.join(' ')} = ${result}`;
			this.$store.dispatch(PUT_HISTORY_ITEM, {historyItem});
		}
	}
</script>

<style scoped>
	.table {
		display: flex;
		max-width: 800px;
		max-height: 700px;
		width: 100%;
		border: 1px solid #000;
		border-right: none;
		box-sizing: border-box
	}

	.column {
		width: 50%;
		border-right: 1px solid #000;
		padding: 20px;
		overflow: auto;
	}
</style>
