/* SELECT DYNAMIC OPTIONS TYPE, AGE AND AMOUNT FOR INSURANCE CALCULATOR
======================================================================================================================= */
import { insurancesData, insuranceList, insuranceTypeList, dependenceList } from './data.js?v9';

const insuranceBanner = document.querySelector('.insurance-banner');
const insuranceTypeCalculator = document.querySelector(".insurance-calculator__type");
const insuranceAgeCalculator = document.querySelector(".insurance-calculator__age");
const insuranceAmountCalculator = document.querySelector(".insurance-calculator__amount");
const insuranceResultCalculator = document.querySelector(".insurance-calculator__result");

if (insuranceBanner) {
  createInsuranceTypesCalculator();
  insuranceTypeCalculator.addEventListener("change", createInsuranceValuesCalculator);
  insuranceAgeCalculator.addEventListener("change", checkInsurance);
  insuranceAmountCalculator.addEventListener("change", checkInsurance);
}

function createInsuranceTypesCalculator() {
  Array.from(insuranceList).forEach(function (el) {
    let option = new Option(el, el);
    insuranceTypeCalculator.appendChild(option);
  });
}

function createInsuranceValuesCalculator() {
  insuranceResultCalculator.textContent = '$0';

  let options = insuranceTypeList[this.value];
  const { age, amount } = options;

  while (insuranceAgeCalculator.options.length > 0) {
    insuranceAgeCalculator.options.remove(0);
  }

  for (let i = age[0]; i <= age[1]; i++) {
    let option = new Option(i, i);
    insuranceAgeCalculator.appendChild(option);
  }

  insuranceAgeCalculator.prepend(new Option('Seleccione', 'Seleccione'));
  insuranceAgeCalculator.firstElementChild.hidden = true;
  insuranceAgeCalculator.firstElementChild.selected = true;
  insuranceAgeCalculator.firstElementChild.value = "";

  while (insuranceAmountCalculator.options.length > 0) {
    insuranceAmountCalculator.options.remove(0);
  }

  Array.from(amount).forEach(function (el) {
    let option = new Option(el, el);
    insuranceAmountCalculator.appendChild(option);
  });

  insuranceAmountCalculator.prepend(new Option('Seleccione', 'Seleccione'));
  insuranceAmountCalculator.firstElementChild.hidden = true;
  insuranceAmountCalculator.firstElementChild.selected = true;
  insuranceAmountCalculator.firstElementChild.value = "";
}

/* CHECK INSURANCE
======================================================================================================================= */
function checkInsurance() {
  const type = insuranceTypeCalculator.value;
  const age = insuranceAgeCalculator.value;
  const amount = insuranceAmountCalculator.value;
  if (type && age && amount) {
    const label = `${age}${amount}`;
    for (let typeData in insurancesData) {
      if (typeData === type) {
        insurancesData[type].forEach(item => {
          for (let key in item) {
            if (key === label) insuranceResultCalculator.textContent = item[label];
          }
        })
      }
    }
  }
}

/* VALIDATE INPUTS FOR JOBS FORM
======================================================================================================================= */
const tableForm = document.getElementById("insurance-calculator");
const tableAmount = document.getElementById("insurance-calculator__result");
const tableFullname = document.getElementById("fullname");
const tableEmail = document.getElementById("email");
const tablePhone = document.getElementById("phone");
const tableWork = document.getElementById("work");
const tableOther = document.getElementById("other");

if (tableForm) {
  doOptionsWork();
  tableForm.addEventListener("submit", validateTableForm);
  tableWork.addEventListener("change", validateTableOther);
}

function doOptionsWork() {
  Array.from(dependenceList).forEach(function (el) {
    let option = new Option(el, el);
    tableWork.appendChild(option);
  });
  tableWork.append(new Option('Otro', 'Otro'));
}

function validateTableOther() {
  if (tableWork.value === 'Otro') {
    document.querySelector('.form-group.other').classList.remove('d-none');
  } else {
    document.querySelector('.form-group.other').classList.add('d-none');
  }
}

function validateTableForm(event) {
  event.preventDefault();

  let warnings = "";
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let error = false;


  if (insuranceResultCalculator.textContent === '$0') {
    warnings += `Calcule un seguro <br>`;
    error = true;
  }
  if (tableFullname.value.length < 6) {
    warnings += `Ingrese su nombre completo <br>`;
    error = true;
  }
  if (!regex.test(tableEmail.value)) {
    warnings += `Ingrese un email valido <br>`;
    error = true;
  }
  if (tablePhone.value.length < 8 || isNaN(tablePhone.value)) {
    warnings += `Ingrese un numero de teléfono valido <br>`;
    error = true;
  }
  if (tableWork.value.length === 0 || tableWork.value === 'Otro' && tableOther.value.length < 4) {
    warnings += `Ingrese su lugar de trabajo <br>`;
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
    sendInfo(tableForm);
  }

}

/* SEND INFO TO EMAIL
======================================================================================================================= */
function sendInfo(formElement) {
  const form = formElement;
  const subject = form.getAttribute("data-subject");

  const inputs = form.getElementsByTagName("input");

  let message = "";

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.type != "submit" && input.value.length != 0) {
      message += `${input.getAttribute("data-name")}: ${input.value} \n `;
    }
  }
  if (tableOther.value.length === 0) {
    message += `${tableWork.getAttribute("data-name")}: ${tableWork.value} \n `;
  }

  message += `Suma asegurada: ${tableAmount.textContent} \n `;

  console.log(message);


  sendToEmail(subject, message, form);
}

function sendToEmail(subject, message, form) {

  $.post("/dist/services/insurancePost.php", {
    subject: subject,
    message: message,
    dataType: "json",
  })
  .done((e) => {
    if (e.indexOf("error") === -1) {
      console.log(e);
      Swal.fire({
        title: "Muchas Gracias",
        text: "Tu mensaje ha sido enviado exitosamente, muy pronto nos comunicaremos contigo",
        icon: "success",
        confirmButtonText: "CERRAR",
      });
      document.querySelector("body").style.cssText = "padding-right: 0";
      form.reset();
      tableAmount.textContent = '$0';
    } else {
      showError();
      console.log("Error:", e);
    }
  })
  .fail((e) => {
    showError();
    console.log("Error:", e);
  });

}

function showError() {
  Swal.fire({
    title: "Error",
    text: "Ha ocurrido un error al crear tu solicitud.",
    icon: "error",
    confirmButtonText: "CERRAR",
  });
}