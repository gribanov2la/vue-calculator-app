<template>
	<div>
		<div class="row" v-for="(item, itemIndex) in items" v-bind:key="itemIndex">{{item}}</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Component from 'vue-class-component';

	@Component({
		props: {
			items: {
				type: Array,
				defaultValue: []
			}
		},
	})
	export default class History extends Vue {
	}
</script>

<style scoped>
	.row {
		margin: 0 0 20px;
	}
</style>
