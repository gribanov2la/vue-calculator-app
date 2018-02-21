<template>
	<div>
		<div id="keyboardRow" v-for="(row, rowIndex) in layout" v-bind:key="rowIndex">
			<CalculatorButton
					v-for="(button, buttonIndex) in row"
					v-bind:key="buttonIndex"
					v-bind:button-click-callback="buttonClickCallback"
					v-bind:config='button'
			/>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import CalculatorButton from './CalculatorButton.vue';

	@Component({
		components: {CalculatorButton},
		props: {
			layout: {
				type: Array,
				defaultValue: []
			},
			buttonClickCallback: {
				type: Function
			}
		},
	})
	export default class CalculatorKeyboard extends Vue {
	}
</script>

<style>
	#keyboardRow {
		border: none;
		border-bottom: 1px solid #666;
		border-left: 1px solid #666;
	}
</style>

