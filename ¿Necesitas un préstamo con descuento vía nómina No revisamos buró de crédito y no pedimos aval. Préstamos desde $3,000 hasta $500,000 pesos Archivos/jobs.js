/* VALIDATE INPUTS FOR JOBS FORM
======================================================================================================================= */
const jobsForm = document.getElementById("jobs-form");
const jobsFullname = document.getElementById("jobs-fullname");
const jobsEmail = document.getElementById("jobs-email");
const JobsPhone = document.getElementById("jobs-phone");
const jobsEstate = document.getElementById("jobs-estate");
const jobsCity = document.getElementById("jobs-city");
const jobsArea = document.getElementById("jobs-area");
const jobsDocument = document.getElementById("jobs-document");

if (jobsForm) {
  jobsDocument.addEventListener('change', validateInputFile);
  jobsForm.addEventListener("submit", validateJobsForm);
}

function validateJobsForm(event) {
  event.preventDefault();

  let warnings = "";
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let error = false;

  if (jobsFullname.value.length < 6) {
    warnings += `Ingrese su nombre completo <br>`;
    error = true;
  }
  if (!regex.test(jobsEmail.value)) {
    warnings += `Ingrese un email valido <br>`;
    error = true;
  }
  if (JobsPhone.value.length < 8 || isNaN(JobsPhone.value)) {
    warnings += `Ingrese un numero de teléfono valido <br>`;
    error = true;
  }
  // if (jobsEstate.value.length == 0) {
  //   warnings += `Seleccione un estado de la república<br>`;
  //   error = true;
  // }
  if (jobsCity.value.length == 0) {
    warnings += `Seleccione una ciudad <br>`;
    error = true;
  }
  if (jobsArea.value.length == 0) {
    warnings += `Seleccione un área de interés <br>`;
    error = true;
  }
  if (jobsDocument.value.length == 0) {
    warnings += `Cargue su curriculum vitae <br>`;
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
    sendInfo(jobsForm);
  }
}


/* VALIDATE INPUT FILE FOR JOBS FORM
======================================================================================================================= */
function validateInputFile() {
  const allowedExtensions = /(\.pdf)$/i;
  const maxFileSize = 4 * 1024 * 1024;
  let error = false;
  let warnings = "";
  const file = jobsDocument.files[0];

  if (!allowedExtensions.exec(file.name)) {
    warnings += `Solo se permiten archivos PDF<br>`;
    jobsDocument.value = '';
    error = true;
  }
  if (file.size > maxFileSize) {
    warnings += `El archivo debe pesar menos de 4MB <br>`;
    jobsDocument.value = '';
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
  }
}


/* SEND INFO TO EMAIL
======================================================================================================================= */
function sendInfo(formElement) {
  const form = formElement;
  const subject = form.getAttribute("data-subject");

  const inputs = form.getElementsByTagName("input");
  const selects = form.getElementsByTagName("select");

  let message = "";
  let curriculum = "";

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.type != "submit" && input.value.length != 0 && input.getAttribute("data-name") !== 'Curriculum') {
      message += `${input.getAttribute("data-name")}: ${input.value} \n `;
    }

    if (input.getAttribute("data-name") === "Curriculum") curriculum = input.files[0];
  }

  for (let i = 0; i < selects.length; i++) {
    const select = selects[i];
    message += `${select.getAttribute("data-name")}: ${select.value} \n `;
  }

  sendToEmail(subject, message, curriculum, form);
}

function sendToEmail(subject, message, curriculum, form) {

  const reader = new FileReader();
  reader.readAsDataURL(curriculum);

  reader.onload = function () {
    const fileContent = reader.result;
    let fileFinal = fileContent.slice(28)
    $.post("/dist/services/emailPost.php", {
      subject: subject,
      message: message,
      file: fileFinal,
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

}

function showError() {
  Swal.fire({
    title: "Error",
    text: "Ha ocurrido un error al crear tu solicitud.",
    icon: "error",
    confirmButtonText: "CERRAR",
  });
}