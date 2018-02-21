<template>
	<div id="display" v-bind:style="scaledStyle">{{ text }}</div>
</template>

<script>
	import Vue from 'vue';
	import Component from 'vue-class-component'

	@Component({
		props: {
			text: {
				type: String,
				defaultValue: ''
			},

		},
	})
	
	export default class CalculatorDisplay extends Vue {
		get scaledStyle () {
			const baseFontSize = 90;
			const fontSizeUnits = 'px';
			const baseSymbolsCount = 6;

			let fontSize = this.text.length <= baseSymbolsCount
				? baseFontSize
				: ((baseSymbolsCount * baseFontSize) / this.text.length);

			return {fontSize: fontSize + fontSizeUnits};
		}
	}
</script>

<style scoped>
	#display {
		color: white;
		background: #1c191c;
		line-height: 130px;
		flex: 1;
		width: 100%;
		height: 130px;
		padding: 5px;
		box-sizing: border-box
	}
</style>