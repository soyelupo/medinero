import { creditsData } from './data.js?v9';

/* VALIDATE INPUTS FOR AMORTIZATION FORM
======================================================================================================================= */
const formAmortization = document.getElementById("amortization-form");
const dependenceAmortization = document.getElementById("amortization-dependence");
const typeAmortization = document.getElementById("amortization-type");
const creditAmortization = document.getElementById("amortization-credit");
const tableAmortization = document.querySelector(".amortization-banner__table");
let calculatorRate;

if (formAmortization) formAmortization.addEventListener("submit", validateAmortizationForm);

function validateAmortizationForm(event) {
  event.preventDefault();

  let warnings = "";
  let error = false;

  if (dependenceAmortization.value.length == 0) {
    warnings += `Seleccione una dependencia <br>`;
    error = true;
  }
  if (typeAmortization.value.length == 0) {
    warnings += `Seleccione un tipo de nomina <br>`;
    error = true;
  }
  if (creditAmortization.value.length == 0) {
    warnings += `Seleccione un valor de crédito <br>`;
    error = true;
  }

  if (error) {
    Swal.fire({
      title: "Error",
      html: warnings,
      icon: "error",
      confirmButtonText: "CERRAR",
    });
    document.querySelector("body").style.cssText = "padding-right: 0";
  } else {
    buildTableAmortization();
  }
}

function buildTableAmortization() {
  tableAmortization.innerHTML = '';
  creditsData.forEach(item => {
    const {dependence, type, min_time, max_time, step_time, rate, method} = item;
    if (dependence === dependenceAmortization.value && type === typeAmortization.value) {
      const amount = parseInt(creditAmortization.value);
      calculatorRate = rate
      let methodCalculate = method;

      for (let i = min_time; i <= max_time; i += step_time) {
        const time = i;
        var interest = 0;
        var total = 0;

        if (methodCalculate === 'pago') {

          if ($(dependenceAmortization).val() === 'Gobierno de la Ciudad de México') {
            if (time == 48 || time == 60) interest = calculatorRate[0];
            if (time == 72 || time == 84) interest = calculatorRate[1];
            if (time == 96) interest = calculatorRate[2];
          }

          if ($(dependenceAmortization).val() === 'SNTE 18 Michoacan') {
            if (time == 72) interest = calculatorRate[0];
            if (time == 84) interest = calculatorRate[1];
            if (time == 96) interest = calculatorRate[2];
            if (time == 108) interest = calculatorRate[3];
            if (time == 120) interest = calculatorRate[4];
          }

          if ($(dependenceAmortization).val() === 'SNTE 51 Puebla') {
            if (time == 48) interest = calculatorRate[0];
            if (time == 60) interest = calculatorRate[1];
            if (time == 72) interest = calculatorRate[2];
            if (time == 84) interest = calculatorRate[3];
            if (time == 96) interest = calculatorRate[4];
          }

          if ($(dependenceAmortization).val() === 'Gobierno de Michoacan') {
            if (time == 72) interest = calculatorRate[0];
            if (time == 84) interest = calculatorRate[1];
            if (time == 96) interest = calculatorRate[2];
            if (time == 108) interest = calculatorRate[3];
            if (time == 120) interest = calculatorRate[4];
          }

          if ($(dependenceAmortization).val() === 'Gobierno de Nuevo León') {
            if (time == 48) interest = calculatorRate[0];
            if (time == 72) interest = calculatorRate[1];
            if (time == 96) interest = calculatorRate[2];
          }

          if ($(dependenceAmortization).val() === 'Tribunal Federal de Justicia Administrativa') {
            if (time == 48) interest = calculatorRate[0];
            if (time == 60) interest = calculatorRate[1];
            if (time == 72) interest = calculatorRate[2];
          }

          if ($(dependenceAmortization).val() === 'Instituto de Pensiones del Estado de Jalisco') {
            if (time == 36) interest = calculatorRate[0];
            if (time == 48) interest = calculatorRate[1];
            if (time == 60) interest = calculatorRate[2];
          }

          if ($(dependenceAmortization).val() === 'CECyTE Jalisco') {
            if (time == 48) interest = calculatorRate[0];
            if (time == 72) interest = calculatorRate[1];
          }

          interest = interest / 100;

          if ($(dependenceAmortization).val() === 'Instituto de pensiones del estado de Jalisco') {
            interest = interest * 1.16 / 1;
          } else {
            interest = interest * 1.16 / 2;
          }

          var im2 = Math.pow((1 + interest), -(time * (time*1/time)));
          total = (amount * interest) / (1 - im2);
        } else {
          interest = calculatorRate[0] / 100;
          total = ((((amount*(interest*12))/24)*time)+(amount)+((amount*(interest*12)*0.16)/24)*time)/time;
        }

        let currency = Intl.NumberFormat('en-US');
        let totalCurrency = currency.format(total.toFixed(2));
        total = totalCurrency;

        const periodity = $(dependenceAmortization).val() === 'Instituto de pensiones del estado de Jalisco' ? 'meses' : 'quincenas';
        let step = document.createElement('div');
        step.classList.add('table-item');
        step.innerHTML = `<span class="table-item__title">${i}<span>${periodity}</span></span><span class="table-item__text">$${total}</span>`;
        tableAmortization.appendChild(step);

      }
      document.querySelector('.amortization-consult__form .form-row').classList.remove('active');
      document.querySelector('.amortization-consult__form .submit-control').disabled = false;

      if ($(dependenceAmortization).val() === 'Instituto de Pensiones del Estado de Jalisco') {
        checkPeriodicity('monthly');
      } else {
        checkPeriodicity();
      }
    }
  })
}

function checkPeriodicity(time = 'biweekly') {
  const periodity = time;
  if (periodity == 'monthly') {
    document.querySelectorAll('.table-item__title span').forEach(item => item.textContent = 'meses');
  } else {
    document.querySelectorAll('.table-item__title span').forEach(item => item.textContent = 'quincenas');
  }
}

/* VALIDATE INPUTS FOR CONSULT FORM
======================================================================================================================= */
const formConsult = document.getElementById("consult-form");
const firstnameConsult = document.getElementById("consult-firstname");
const lastnameConsult = document.getElementById("consult-lastname");
const emailConsult = document.getElementById("consult-email");
const phoneConsult = document.getElementById("consult-phone");

if (formConsult) formConsult.addEventListener("submit", validateConsultForm);

function validateConsultForm(event) {
  event.preventDefault();

  let warnings = "";
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let error = false;

  if (firstnameConsult.value.length < 4) {
    warnings += `Ingrese su nombre <br>`;
    error = true;
  }
  if (lastnameConsult.value.length < 4) {
    warnings += `Ingrese su apellido <br>`;
    error = true;
  }
  if (!regex.test(emailConsult.value)) {
    warnings += `Ingrese un email valido <br>`;
    error = true;
  }
  if (phoneConsult.value.length < 8 || isNaN(phoneConsult.value)) {
    warnings += `Ingrese un numero de teléfono valido <br>`;
    error = true;
  }

  if (error) {
    Swal.fire({
      title: "Error",
      html: warnings,
      icon: "error",
      confirmButtonText: "CERRAR",
    });
    document.querySelector("body").style.cssText = "padding-right: 0";
  } else {
    let formdata = new FormData();
    formdata.append("nombre", `${firstnameConsult.value} ${lastnameConsult.value}`);
    formdata.append("telefono", phoneConsult.value);
    formdata.append("correo", emailConsult.value);
    formdata.append("estado", dependenceAmortization.value);
    formdata.append("dependencia", typeAmortization.value);
    formdata.append("monto", creditAmortization.value);
    formdata.append("quincena", '0');
    formdata.append("pago", '0');
    formdata.append("utm", utmParam);
    let url = `${ENDPOINT}/api/solicitud-credito`;

    sendInfo(formConsult, formdata, url);
  }
}
