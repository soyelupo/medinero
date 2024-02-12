/* SELECT DYNAMIC OPTIONS STATE & DEPENDENCE
======================================================================================================================= */
import { dependenceList, typeList, creditsData } from './data.js?v9';

const dependenceCalculator = document.querySelector(".calculator-dependence");
const typeCalculator = document.querySelector(".calculator-type");

if (dependenceCalculator) {
  createDependenceValuesCalculator();
  dependenceCalculator.addEventListener("change", createTypeValuesCalculator);
}

function createDependenceValuesCalculator() {
  Array.from(dependenceList).forEach(function (el) {
    let option = new Option(el, el);
    dependenceCalculator.appendChild(option);
  });
}

function createTypeValuesCalculator() {
  let options = typeList[this.value];

  while (typeCalculator.options.length > 0) {
    typeCalculator.options.remove(0);
  }

  Array.from(options).forEach(function (el) {
    let option = new Option(el, el);
    typeCalculator.appendChild(option);
  });

  typeCalculator.firstElementChild.hidden = true;
  typeCalculator.firstElementChild.value = "";
}


/* ANIMATION FOR CREDIT FORMS
======================================================================================================================= */
const homeBanner = document.querySelector('.home-banner');
const creditInfo = document.querySelector('.credit-info');

const contentCalculator = document.querySelector('.calculator-content');
// const rowForm2Calculator  = document.querySelector('.calculator-form .form-row:nth-child(2)');
// const rowForm3Calculator  = document.querySelector('.calculator-form .form-row:nth-child(3)');

if (homeBanner || creditInfo) checkCalculator();

function checkCalculator() {
  contentCalculator.classList.add('active');
  // rowForm2Calculator.classList.add('active');
  // rowForm3Calculator.classList.add('active');

  dependenceCalculator.addEventListener('change', checkCalculatorValues);
  typeCalculator.addEventListener('change', checkCalculatorValues);
}

function checkCalculatorValues() {
  if (dependenceCalculator.value.length > 0 && typeCalculator.value.length > 0) {
    contentCalculator.classList.remove('active');
    // rowForm2Calculator.classList.remove('active');
    // rowForm3Calculator.classList.remove('active');
  } else {
    contentCalculator.classList.add('active');
    // rowForm2Calculator.classList.add('active');
    // rowForm3Calculator.classList.add('active');
  }
}


/* JQUERY
======================================================================================================================= */
(function ($) {

  // SET AMOUNT IN THE CALCULATOR
  var valueAmount = $('.credit-amount__bar').val();
  setAmount(valueAmount);

  $(document).on('input', '.credit-amount__bar', function(e) {
    setAmount(e.currentTarget.value);
  });

  // SET FORMAT NUMBER TO CURRENCY
  function setFormatAmount(amount) {
    let currency = Intl.NumberFormat('en-US');
    return '$' + currency.format(amount);
  }

  function setAmount(amount) {
    $('.calculator-box__amount').html(setFormatAmount(amount));
  }
  // INIT AND SET RANGE SLIDERS
  $('input[type=range]').rangeslider({polyfill: false});

  // CALCULATE CREDIT
  $('input[type=range]').on("input", buildCredit);


  const calculatorAmount = $('#calculator-amount');
  const calculatorTime = $('#calculator-time');
  const calculatorDependence = $('#calculator-dependence');
  const calculatorType = $('#calculator-type');
  var calculatorRate;
  var methodCalculate;

  $(document).on('input', '.home-banner .calculator-type, .credit-info .calculator-type', function() {
    buildRangeAmount();
    buildRangeTime();
    buildCredit();
  });

  function buildRangeAmount() {
    creditsData.forEach(item => {
      const {dependence, type, min_amount, max_amount} = item;
      if (dependence === $(calculatorDependence).val() && type === $(calculatorType).val()) {
        $(calculatorAmount).attr('min', min_amount);
        $(calculatorAmount).attr('max', max_amount);
        $(calculatorAmount).val(30000);
        buildAmounts(min_amount, max_amount);
      }
    })
    $('input[type=range]').rangeslider('update', true);
  }

  function buildAmounts(min, max) {
    $('.credit-amount__values:first-child').html(setFormatAmount(min));
    $('.credit-amount__values:last-child').html(setFormatAmount(max));
    setAmount(valueAmount);
  }

  function buildRangeTime() {
    creditsData.forEach(item => {
      const {dependence, type, min_time, max_time, step_time, rate, method} = item;
      if (dependence === $(calculatorDependence).val() && type === $(calculatorType).val()) {
        $(calculatorTime).attr('min', min_time);
        $(calculatorTime).attr('max', max_time);
        $(calculatorTime).attr('step', step_time);
        $(calculatorTime).val(min_time + step_time);
        calculatorRate = rate;
        methodCalculate = method;
        buildStepsTime(min_time, max_time, step_time);

      }
    })
    $('input[type=range]').rangeslider('update', true);
  }

  function buildStepsTime(min, max, step) {
    $('.credit-time__info').html('');
    for (var i = min; i <= max; i += step) {
      let step = $('<span class="credit-time__values">'+ i +'</span>');
      $('.credit-time__info').append(step);
    }
  }

  function buildCredit() {
    const amount = parseInt(calculatorAmount.val());
    const time = parseInt(calculatorTime.val());
    let rate = 0;
    let total = 0;

    if (methodCalculate === 'pago') {

      if ($(calculatorDependence).val() === 'Gobierno de la Ciudad de México') {
        if (time == 48 || time == 60) rate = calculatorRate[0];
        if (time == 72 || time == 84) rate = calculatorRate[1];
        if (time == 96) rate = calculatorRate[2];
      }

      if ($(calculatorDependence).val() === 'SNTE 18 Michoacan') {
        if (time == 72) rate = calculatorRate[0];
        if (time == 84) rate = calculatorRate[1];
        if (time == 96) rate = calculatorRate[2];
        if (time == 108) rate = calculatorRate[3];
        if (time == 120) rate = calculatorRate[4];
      }

      if ($(calculatorDependence).val() === 'SNTE 51 Puebla') {
        if (time == 48) rate = calculatorRate[0];
        if (time == 60) rate = calculatorRate[1];
        if (time == 72) rate = calculatorRate[2];
        if (time == 84) rate = calculatorRate[3];
        if (time == 96) rate = calculatorRate[4];
      }

      if ($(calculatorDependence).val() === 'Gobierno de Michoacan') {
        if (time == 72) rate = calculatorRate[0];
        if (time == 84) rate = calculatorRate[1];
        if (time == 96) rate = calculatorRate[2];
        if (time == 108) rate = calculatorRate[3];
        if (time == 120) rate = calculatorRate[4];
      }

      if ($(calculatorDependence).val() === 'Gobierno de Nuevo León') {
        if (time == 48) rate = calculatorRate[0];
        if (time == 72) rate = calculatorRate[1];
        if (time == 96) rate = calculatorRate[2];
      }

      if ($(calculatorDependence).val() === 'Tribunal Federal de Justicia Administrativa') {
        if (time == 48) rate = calculatorRate[0];
        if (time == 60) rate = calculatorRate[1];
        if (time == 72) rate = calculatorRate[2];
      }

      if ($(calculatorDependence).val() === 'Instituto de Pensiones del Estado de Jalisco') {
        if (time == 36) rate = calculatorRate[0];
        if (time == 48) rate = calculatorRate[1];
        if (time == 60) rate = calculatorRate[2];
      }

      if ($(calculatorDependence).val() === 'CECyTE Jalisco') {
        if (time == 48) rate = calculatorRate[0];
        if (time == 72) rate = calculatorRate[1];
      }

      rate = rate / 100;

      if ($(calculatorDependence).val() === 'Instituto de Pensiones del Estado de Jalisco') {
        checkPeriodicity('monthly');
        rate = rate * 1.16 / 1;
      } else {
        checkPeriodicity();
        rate = rate * 1.16 / 2;
      }

      var im2 = Math.pow((1 + rate), -(time * (time*1/time)));
      total = (amount * rate) / (1 - im2);
    } else {
      checkPeriodicity();

      rate = calculatorRate[0] / 100;
      total = ((((amount*(rate*12))/24)*time)+(amount)+((amount*(rate*12)*0.16)/24)*time)/time;
    }


    var outputPayment = $('#calculator-payment');

    $(outputPayment).attr('data-value', total.toFixed(2));
    setFormatPayment(total.toFixed(2));

    // SET FORMAT NUMBER TO CURRENCY
    function setFormatPayment(payment) {
      let currency = Intl.NumberFormat('en-US');
      $(outputPayment).html('$' + currency.format(payment));
    }
  }

  function checkPeriodicity(time = 'biweekly') {
    const periodity = time;
    if (periodity == 'monthly') {
      $('.credit-time__title span').text('mensualidades');
      $('.payment-title span').text('mensual');
    } else {
      $('.credit-time__title span').text('quincenas');
      $('.payment-title span').text('quincenal');
    }
  }

})(jQuery);
