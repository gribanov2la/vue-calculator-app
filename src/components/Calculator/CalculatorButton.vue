<template>
	<button v-bind:class="buttonClasses" v-on:click.prevent="onClickButton">{{ config.caption }}</button>
</template>

<script>
	import Vue from 'vue';
	import Component from 'vue-class-component';

	@Component({
		props: {
			config: {
				type: Object,
        required: true
			},
			buttonClickCallback: {
				type: Function,
        required: true
      }
		},
	})
	export default class CalculatorButton extends Vue {
		get buttonClasses() {
			let classes = ['button'];

			if (typeof this.theme !== 'undefined') {
				classes.push('theme-' + this.config.theme);
			}

			if (typeof this.size !== 'undefined') {
				classes.push('size-' + this.config.size)
			}

			return classes.join(' ');
		}

		get theme() {
		  return this.config.theme;
    }

    get size() {
      return this.config.size;
    }

		onClickButton() {
			this.buttonClickCallback(this.config);
		}
	}
</script>

<style scoped>
	.button {
		width: 80px;
		height: 80px;
		text-align: center;
		line-height: 80px;
		text-rendering: auto;
		color: initial;
		letter-spacing: normal;
		word-spacing: normal;
		text-transform: none;
		text-indent: 0;
		text-shadow: none;
		display: inline-block;
		margin: 0;
		font-size: 3em;
		font-weight: 100;
		border: none;
		border-right: 1px solid #666;
		padding: 0;
		box-sizing: content-box;
		cursor: pointer;
	}

	.theme-gray {
		background: #e0e0e7;
	}

	.theme-orange {
		background: rgba(252,156,23,1);
		color: white;
	}

	.size-2 {
		width: 161px;
	}
</style>
