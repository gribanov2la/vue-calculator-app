<template>
  <div id="calculator">
    <CalculatorDisplay v-bind:text="textQuery"/>
    <CalculatorKeyboard v-bind:layout="keyboardLayout" v-bind:button-click-callback="processButtonClick"/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import CalculatorDisplay from './CalculatorDisplay';
  import CalculatorKeyboard from './CalculatorKeyboard';
  import QueryProcessor from '../../services/CalculatorQueryProcessor';

  @Component({
    components: {CalculatorDisplay, CalculatorKeyboard},
    props: {
      calculateCallback: {
        type: Function
      }
    },
  })
  export default class Calculator extends Vue {
    /**
     * Знак обозначающий точку
     *
     * @type {string}
     */
    point = '.';
    /**
     * Операторы, разрешенные для использования
     *
     * @type {Array}
     */
    operators = ['-', '+', '*', '/', '%'];
    /**
     * Левосторонние унарные операторы
     *
     * @type {Array}
     */
    leftUnaryOperators = ['%'];
    /**
     * Максимальное количество операндов для вычисление (возможно расширение)
     *
     * @type {number}
     */
    maxOperands = 2;

    /**
     * Количество чисел после запятой
     *
     * @type {Number}
     */
    digitsAfterPoint = 6;

    /**
     * Раскладка клавиатуры
     *
     * command: Имя метода, который будет вызван при нажатии на кнопку.
     * operator: Оператор, который будет вставлен при нажатии
     * operand: Операнд, который будет вставлен при нажатии
     * caption: Надпись на кнопке.
     * theme: цветовая схема кнопки (gray || orange).
     *
     * @type {Array}
     */
    keyboardLayout = [
      [
        {command: 'commandClear', caption: 'AC', theme: 'gray'},
        {command: 'commandSwitchSign', caption: '±', theme: 'gray'},
        {operator: '%', caption: '%', theme: 'gray'},
        {operator: '/', caption: '÷', theme: 'orange'}
      ],
      [
        {operand: '7', caption: '7', theme: 'gray'},
        {operand: '8', caption: '8', theme: 'gray'},
        {operand: '9', caption: '9', theme: 'gray'},
        {operator: '*', caption: 'x', theme: 'orange'}
      ],
      [
        {operand: '4', caption: '4', theme: 'gray'},
        {operand: '5', caption: '5', theme: 'gray'},
        {operand: '6', caption: '6', theme: 'gray'},
        {operator: '-', caption: '-', theme: 'orange'}
      ],
      [
        {operand: '1', caption: '1', theme: 'gray'},
        {operand: '2', caption: '2', theme: 'gray'},
        {operand: '3', caption: '3', theme: 'gray'},
        {operator: '+', caption: '+', theme: 'orange'}
      ],
      [
        {operand: '0', size: 2, caption: '0', theme: 'gray'},
        {command: 'commandAddPoint', caption: ',', theme: 'gray'},
        {command: 'commandCalculate', caption: '=', theme: 'gray'},
      ],
    ];

    queryProcessor = null;

    query = [];

    created() {
      this.queryProcessor = new QueryProcessor({
        digitsAfterPoint: this.digitsAfterPoint,
        point: this.point,
        operators: this.operators,
        leftUnaryOperators: this.leftUnaryOperators,
        maxOperands: this.maxOperands
      });
    }

    get textQuery() {
      return this.query.join('');
    }

    /**
     * Обрабатывает нажатие по кнопке калькулятора, в зависимости от конфигурации производит различные действия
     *
     * @param button
     * @returns {*}
     */
    processButtonClick(button) {
      if (typeof button.operand !== 'undefined') {
        return this.commandOperand(button.operand);
      }
      if (typeof button.command !== 'undefined') {
        return this[button.command]();
      }
      if (typeof button.operator !== 'undefined') {
        return this.commandOperator(button.operator);
      }
    }

    onCalculateCallback(query, result) {
      if (typeof this.calculateCallback === "function") {
        this.calculateCallback(query, result);
      }
    }

    /**
     * Производит вычисление текущей query, результатом будет новый операнд, вставленый в пустую query
     */
    commandCalculate() {
      let result = this.queryProcessor.calculate(this.query);

      if (result === null) {
        return;
      }
      this.onCalculateCallback(this.query, result);

      return this.query = [result];
    }

    /**
     * Обрабатывает команду очистки query
     */
    commandClear() {
      return this.query = this.queryProcessor.queryClear();
    }

    /**
     * Обрабатывает команду смены знака
     */
    commandSwitchSign() {

      return this.query = this.queryProcessor.querySwitchLastOperandSign(this.query);
    }

    /**
     * Обрабатывает команду добавления точки
     */
    commandAddPoint() {

      return this.query = this.queryProcessor.queryAddPoint(this.query, this.query.length - 1);
    }

    /**
     * Обрабатывает команду добавления операнда
     *
     * @param operand
     */
    commandOperand(operand) {
      return this.query = this.queryProcessor.queryAddOperand(this.query, operand);
    }

    /**
     * Обрабатывает команду добавления оператора
     *
     * @param operator
     */
    commandOperator(operator) {

      return this.query = this.queryProcessor.queryAddOperator(this.query, operator);
    }
  }
</script>

<style scoped>
  #calculator {
    width: 325px;
    box-shadow: 0 0 20px 0 #aaa;
  }
</style>
