const ENDPOINT = 'https://admin.midinerito.mx';

/* SETUP LINKS FOR LOCAL VERSION
======================================================================================================================= */
function checkEnvironment() {
  const anchors = document.querySelectorAll('a');
  if (window.location.origin.includes('localhost')) {
    anchors.forEach(anchor => {
      const href = anchor.getAttribute('href');
      if (href !== '' && href !== '/' && href !== null && !href.includes('pdf') && !anchor.className.includes('external') && !href.includes('mailto:') && !href.includes('tel:')) {
        anchor.setAttribute('href', href + '.php');
      }
      if (href.includes('#')) {
        var newHref = href.slice(0,  href.indexOf('#')) + ".php" + href.slice(href.indexOf('#'));
        anchor.setAttribute('href', newHref);
      }
    })
  }
}
checkEnvironment();


/* HEADER SCROLL ANIMATION
======================================================================================================================= */
window.addEventListener("scroll", checkHeader);

function checkHeader() {
  let scrollPosition = Math.round(window.scrollY);

  if (scrollPosition > 50) {
    document.querySelector(".header").classList.add("active");
  } else {
    document.querySelector(".header").classList.remove("active");
  }
}
checkHeader();


/* TAB DYNAMIC FOR ADVANCEMENT BANNER AND RETIREES BANNER
======================================================================================================================= */
const tabs = document.querySelectorAll('.info-tabs__item');
const tabsContent = document.querySelectorAll('.info-content');

tabs.forEach(tab => {
  tab.addEventListener('click', openTab);
})

function openTab() {

  const id = this.getAttribute('data-tab');

  tabs.forEach(tab => tab.classList.remove('active'));
  tabsContent.forEach(tab => tab.classList.remove('active'));

  this.classList.add('active');
  document.querySelector('div[data-content="'+ id +'"]').classList.add('active');
}



/* JQUERY
======================================================================================================================= */
(function ($) {

  // SET ANIMATION HOME PRODUCTS CARDS
  if ($(window).width() > 768) {
    $('.home-products .swiper-item').mouseenter(function() {
      $(this).addClass('active');
    })
    $('.home-products .swiper-item').mouseleave(function() {
      $(this).removeClass('active');
    })
  }

  // SCROLL SMOOTH
  var adjustAnchor = function() {

    var $anchor = $(':target'),
    	fixedElementHeight = 100;

    if ($anchor.length > 0) {

      $('html, body')
        .stop()
        .animate({
          scrollTop: $anchor.offset().top - fixedElementHeight
        }, 200);
    }
  };

  $(window).on('hashchange load', function() {
    adjustAnchor();
  });

  if ($(window).width() < 992) {
    $('.home-banner .calculator-form__disclaimer').appendTo('.home-banner .calculator-form > div:nth-child(2)');
  }

  if ($(window).width() < 992) {
    $('.toogle-submenu').click(function() {
      $(this).toggleClass('active');
    });
    console.log($(window).width());
  } else {
    $('.toogle-submenu').mouseenter(function() {
      $(this).addClass('active');
    });

    $('.toogle-submenu').mouseleave(function() {
      $(this).removeClass('active');
    });
  }

})(jQuery);


/* ANIMATION ITEMS FOR INSURANCE PAGE
======================================================================================================================= */
// const itemsInsurance = document.querySelectorAll('.features-info__item');

// if (itemsInsurance) {
//   let timer = 200;
//   itemsInsurance.forEach(item => {
//     setTimeout(() => {
//       item.classList.add('active');
//     }, timer);
//     timer += 400;
//   })
// }


/* ANIMATION TABS CONTENT FOR ADVANCEMENT PAGE
======================================================================================================================= */
const advancementInfo = document.querySelector('.advancement-banner');

if (advancementInfo) {
  const tabCompanies = document.querySelector('li[data-tab="empresas"]');
  const tabEmployees = document.querySelector('li[data-tab="empleados"]');

  const listCompanies = document.querySelector('.info-content[data-content="empresas"] .info-content__list');
  const listEmployees = document.querySelector('.info-content[data-content="empleados"] .info-content__list');

  tabCompanies.addEventListener('click', function() {
    setTimeout(() => {
      listCompanies.classList.add('active');
    }, 400);
    listEmployees.classList.remove('active');
  })

  tabEmployees.addEventListener('click', function() {
    setTimeout(() => {
      listEmployees.classList.add('active');
    }, 400);
    listCompanies.classList.remove('active');
  })

  tabCompanies.click();
}


/* ANIMATION TABS CONTENT FOR RETIREES PAGE
======================================================================================================================= */
const retireesInfo = document.querySelector('.retirees-info');

if (retireesInfo) {
  const tabDocuments = document.querySelector('.retirees-info li[data-tab="documentos"]');
  const tabRequirements = document.querySelector('.retirees-info li[data-tab="requisitos"]');

  const listDocuments = document.querySelector('.retirees-info .info-content[data-content="documentos"] .info-content__list');
  const listRequirements = document.querySelector('.retirees-info .info-content[data-content="requisitos"] .info-content__list');

  tabDocuments.addEventListener('click', function() {
    setTimeout(() => {
      listDocuments.classList.add('active');
    }, 400);
    listRequirements.classList.remove('active');
  })

  tabRequirements.addEventListener('click', function() {
    setTimeout(() => {
      listRequirements.classList.add('active');
    }, 400);
    listDocuments.classList.remove('active');
  })

  tabDocuments.click();
}

/* VALIDATE INPUTS FOR CREDIT FORM
======================================================================================================================= */
const formCalculator = document.getElementById("calculator-form");
const firstnameCalculator = document.getElementById("calculator-firstname");
const lastnameCalculator = document.getElementById("calculator-lastname");
const emailCalculator = document.getElementById("calculator-email");
const phoneCalculator = document.getElementById("calculator-phone");
const dependenceCalculator = document.getElementById("calculator-dependence");
const typeCalculator = document.getElementById("calculator-type");

const amountCalculator = document.getElementById("calculator-amount");
const timeCalculator = document.getElementById("calculator-time");
const paymentCalculator = document.getElementById("calculator-payment");

if (formCalculator) formCalculator.addEventListener("submit", validateCalculatorForm);

function validateCalculatorForm(event) {
  event.preventDefault();
  let referrerData = JSON.parse(window.localStorage.getItem("mbsy/cookie"));
  if (referrerData !== null) referrerData.value;

  let warnings = "";
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let error = false;

  if (dependenceCalculator.value.length == 0) {
    warnings += `Seleccione un convenio <br>`;
    error = true;
  }
  if (typeCalculator.value.length == 0) {
    warnings += `Seleccione un tipo de nomina <br>`;
    error = true;
  }
  if (firstnameCalculator.value.length < 4) {
    warnings += `Ingrese su nombre <br>`;
    error = true;
  }
  if (lastnameCalculator.value.length < 4) {
    warnings += `Ingrese su apellido <br>`;
    error = true;
  }
  if (!regex.test(emailCalculator.value)) {
    warnings += `Ingrese un email valido <br>`;
    error = true;
  }
  if (phoneCalculator.value.length < 8 || isNaN(phoneCalculator.value)) {
    warnings += `Ingrese un numero de telÃ©fono valido <br>`;
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
    formdata.append("nombre", `${firstnameCalculator.value} ${lastnameCalculator.value}`);
    formdata.append("telefono", phoneCalculator.value);
    formdata.append("correo", emailCalculator.value);
    formdata.append("estado", dependenceCalculator.value);
    formdata.append("dependencia", typeCalculator.value);
    formdata.append("monto", amountCalculator.value);
    formdata.append("quincena", timeCalculator.value);
    formdata.append("pago", paymentCalculator.getAttribute('data-value'));
    formdata.append("utm", utmParam);
    let url = `${ENDPOINT}/api/solicitud-credito`;

    sendInfo(formCalculator, formdata, url);

    if (referrerData !== null){
      mbsy.identify({ email: emailCalculator.value, phone: phoneCalculator.value, firstName: firstnameCalculator.value, lastName: lastnameCalculator.value, custom1: dependenceCalculator.value, custom2: typeCalculator.value, custom3: amountCalculator.value, custom5: timeCalculator.value, custom6: paymentCalculator.getAttribute('data-value') },{enroll:true, campaigns:57452, segments:1, emailNewAmbassador:true })
      mbsy.track({revenue: amountCalculator.value})
    }
  }
}


/* VALIDATE INPUTS FOR ADVANCEMENT FORM
======================================================================================================================= */
const formAdvancement = document.getElementById("advancement-form");
const firstnameAdvancement = document.getElementById("advancement-firstname");
const lastnameAdvancement = document.getElementById("advancement-lastname");
const emailAdvancement = document.getElementById("advancement-email");
const jobAdvancement = document.getElementById("advancement-job");
const phoneAdvancement = document.getElementById("advancement-phone");
const companyAdvancement = document.getElementById("advancement-company");
const employeesAdvancement = document.getElementById("advancement-employees");

if (formAdvancement) formAdvancement.addEventListener("submit", validateAdvancementForm);

function validateAdvancementForm(event) {
  event.preventDefault();

  let warnings = "";
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let error = false;

  if (firstnameAdvancement.value.length < 4) {
    warnings += `Ingrese su nombre <br>`;
    error = true;
  }
  if (lastnameAdvancement.value.length < 4) {
    warnings += `Ingrese su apellido <br>`;
    error = true;
  }
  if (!regex.test(emailAdvancement.value)) {
    warnings += `Ingrese un email valido <br>`;
    error = true;
  }
  if (jobAdvancement.value.length < 6) {
    warnings += `Ingrese su puesto de trabajo <br>`;
    error = true;
  }
  if (phoneAdvancement.value.length < 8 || isNaN(phoneAdvancement.value)) {
    warnings += `Ingrese un numero de teléfono valido <br>`;
    error = true;
  }
  if (companyAdvancement.value.length < 6) {
    warnings += `Ingrese el nombre de su empresa <br>`;
    error = true;
  }
  if (employeesAdvancement.value.length == 0) {
    warnings += `Seleccione un rango de No. de empleados <br>`;
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
    formdata.append("nombre", `${firstnameAdvancement.value} ${lastnameAdvancement.value}`);
    formdata.append("celular", phoneAdvancement.value);
    formdata.append("correo", emailAdvancement.value);
    formdata.append("puesto", jobAdvancement.value);
    formdata.append("empresa", companyAdvancement.value);
    formdata.append("no_empresa", employeesAdvancement.value);
    let url = `${ENDPOINT}/api/adelanto-nomina`;

    sendInfo(formAdvancement, formdata, url);
  }
}


/* VALIDATE INPUTS FOR INSURANCE FORM
======================================================================================================================= */
const formInsurance = document.getElementById("insurance-form");
const firstnameInsurance = document.getElementById("insurance-firstname");
const lastnameInsurance = document.getElementById("insurance-lastname");
const emailInsurance = document.getElementById("insurance-email");
const phoneInsurance = document.getElementById("insurance-phone");

if (formInsurance) formInsurance.addEventListener("submit", validateInsuranceForm);

function validateInsuranceForm(event) {
  event.preventDefault();

  let warnings = "";
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let error = false;

  if (firstnameInsurance.value.length < 4) {
    warnings += `Ingrese su nombre <br>`;
    error = true;
  }
  if (lastnameInsurance.value.length < 4) {
    warnings += `Ingrese su apellido <br>`;
    error = true;
  }
  if (!regex.test(emailInsurance.value)) {
    warnings += `Ingrese un email valido <br>`;
    error = true;
  }
  if (phoneInsurance.value.length < 8 || isNaN(phoneInsurance.value)) {
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
    formdata.append("nombre", `${firstnameInsurance.value} ${lastnameInsurance.value}`);
    formdata.append("telefono", phoneInsurance.value);
    formdata.append("correo", emailInsurance.value);
    let url = `${ENDPOINT}/api/seguro`;

    sendInfo(formInsurance, formdata, url);
  }
}


/* VALIDATE INPUTS FOR RETIREES FORM
======================================================================================================================= */
const formRetirees = document.getElementById("retirees-form");
const firstnameRetirees = document.getElementById("retirees-firstname");
const lastnameRetirees = document.getElementById("retirees-lastname");
const cityRetirees = document.getElementById("retirees-city");
const phoneRetirees = document.getElementById("retirees-phone");

if (formRetirees) formRetirees.addEventListener("submit", validateRetireesForm);

function validateRetireesForm(event) {
  event.preventDefault();

  let warnings = "";
  let error = false;

  if (firstnameRetirees.value.length < 4) {
    warnings += `Ingrese su nombre <br>`;
    error = true;
  }
  if (lastnameRetirees.value.length < 4) {
    warnings += `Ingrese su apellido <br>`;
    error = true;
  }
  if (cityRetirees.value.length < 4) {
    warnings += `Ingrese su lugar de residencia <br>`;
    error = true;
  }
  if (phoneRetirees.value.length < 8 || isNaN(phoneRetirees.value)) {
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
    formdata.append("nombre", firstnameRetirees.value);
    formdata.append("apellido", lastnameRetirees.value);
    formdata.append("residencia", cityRetirees.value);
    formdata.append("telefono", phoneRetirees.value);
    let url = `${ENDPOINT}/api/pension-jubilado`;

    sendInfo(formRetirees, formdata, url);
  }
}

/* VALIDATE INPUTS FOR RETARGETING FORM
======================================================================================================================= */
const formRetargeting = document.getElementById("retargeting-form");
const nameRetargeting = document.getElementById("retargeting-name");
const phoneRetargeting = document.getElementById("retargeting-phone");
const emailRetargeting = document.getElementById("retargeting-email");
const dependenceRetargeting = document.getElementById("retargeting-dependence");
import { dependenceList } from './data.js?v10';

if (dependenceRetargeting) {
  createDependenceValues();
}

function createDependenceValues() {
  Array.from(dependenceList).forEach(function (el) {
    let option = new Option(el, el);
    dependenceRetargeting.appendChild(option);
  });
}

if (formRetargeting) formRetargeting.addEventListener("submit", validateRetargetingForm);

function validateRetargetingForm(event) {
  event.preventDefault();

  let warnings = "";
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let error = false;

  if (nameRetargeting.value.length < 4) {
    warnings += `Ingrese su nombre <br>`;
    error = true;
  }
  if (phoneRetargeting.value.length < 8 || isNaN(phoneRetargeting.value)) {
    warnings += `Ingrese un numero de teléfono valido <br>`;
    error = true;
  }
  if (!regex.test(emailRetargeting.value)) {
    warnings += `Ingrese un email valido <br>`;
    error = true;
  }
  if (dependenceRetargeting.value.length == 0) {
    warnings += `Seleccione un convenio <br>`;
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
    formdata.append("nombre", nameRetargeting.value);
    formdata.append("telefono", phoneRetargeting.value);
    formdata.append("correo", emailRetargeting.value);
    formdata.append("estado", dependenceRetargeting.value);
    formdata.append("dependencia", '-');
    formdata.append("monto", '0');
    formdata.append("quincena", '0');
    formdata.append("pago", '0');
    formdata.append("utm", utmParam);
    let url = `${ENDPOINT}/api/solicitud-credito`;

    sendInfo(formRetargeting, formdata, url);
  }
}


/* SEND INFO FORMS TO BACK
======================================================================================================================= */
function sendInfo(form, formdata, url) {
  let requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch(url, requestOptions)
    .then(data => data.json())
    .then(response => {
      const {result} = response;
      if (result === 1) {
        showSuccess();
        form.reset();
        if (homeBanner || creditInfo) checkCalculatorValues();
        if (amortizationBanner) checkConsultValues();
      } else {
        showError();
      }
      console.log(response);
    })
    .catch(error => {
      showError();
      console.log('error', error)
    });
}

function showSuccess() {
  Swal.fire({
    title: "Muchas Gracias",
    text: "Tu solicitud ha sido enviado exitosamente, muy pronto nos comunicaremos contigo.",
    icon: "success",
    confirmButtonText: "CERRAR",
  });
}

function showError() {
  Swal.fire({
    title: "Error",
    text: "Ha ocurrido un error al crear tu solicitud, intentalo nuevamente.",
    icon: "error",
    confirmButtonText: "CERRAR",
  });
}


/* ANIMATION FOR CREDIT FORMS
======================================================================================================================= */
const homeBanner = document.querySelector('.home-banner');
const creditInfo = document.querySelector('.credit-info');
const contentCalculator = document.querySelector('.calculator-content');
const rowForm2Calculator  = document.querySelector('.calculator-form .form-row:nth-child(2)');
const rowForm3Calculator  = document.querySelector('.calculator-form .form-row:nth-child(3)');

function checkCalculatorValues() {
  if (dependenceCalculator.value.length > 0 && typeCalculator.value.length > 0) {
    contentCalculator.classList.remove('active');
    rowForm2Calculator.classList.remove('active');
    rowForm3Calculator.classList.remove('active');
  } else {
    contentCalculator.classList.add('active');
    rowForm2Calculator.classList.add('active');
    rowForm3Calculator.classList.add('active');
  }
}


/* ANIMATION FOR CREDIT FORMS
======================================================================================================================= */
const amortizationBanner = document.querySelector('.amortization-banner');

function checkConsultValues() {
  document.querySelector('.amortization-banner__form').reset();
  document.querySelector('.amortization-consult__form .form-row').classList.add('active');
  document.querySelector('.amortization-consult__form .submit-control').disabled = true;
  document.querySelector(".amortization-banner__table").innerHTML = '';

  for (let i = 24; i <= 72; i += 12) {
    let step = document.createElement('div');
    step.classList.add('table-item');
    step.innerHTML = `<span class="table-item__title">${i}<span>quincenas</span></span><span class="table-item__text">-</span>`;
    document.querySelector(".amortization-banner__table").appendChild(step);
  }
}


/* 
======================================================================================================================= */
const footerSubmenu = document.querySelector('.submenu');
if (footerSubmenu) {
  footerSubmenu.addEventListener('click', (e) => {
    e.target.children[0].classList.add('active');
  })
}

/* GET CURRENT YEAR
======================================================================================================================= */
const year = new Date().getFullYear();
const yearContent = document.querySelector('.footer-copyright__text span');
if (yearContent) {
  yearContent.innerHTML = year;
}

/* 
======================================================================================================================= */
const path = window.location.pathname;

if (path.includes('referidoslanding')) {
  if (!localStorage.getItem('terms')) {
    Swal.fire({
      title: 'Terminos y condiciones',
      html: '<span>Para poder continuar navegando debes aceptar <a href="./dist/docs/terminos.pdf" target="_blank" style="text-decoration: underline;">terminos y condiciones</a></span> <br> <small>Solo Aplica para clientes nuevos</small>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem('terms', true);
        } else {
          window.location.assign('/referidos');
        }
    });
  }
}
