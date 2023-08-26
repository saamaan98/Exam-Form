"use strict";
function highlightField(field) {
  field.style.border = '1.5px solid red';
}

function unHighlightField(field) {
  field.style.border = '1px solid grey';
}

function hideBorder(field) {
  field.style.border = '0px';
}

function validateAndHighlightEmptyFields(fields) {
  let emptyCount = 0;

  fields.forEach(field => {
    if (!field.value) {
      emptyCount++;
      highlightField(field);
    } else {
      unHighlightField(field);
    }
  });

  return emptyCount;
}

function validateAndHighlightEmptySelectFields(fields) {
  let emptyCount = 0;
  fields.forEach(field => {
    let selectedButton = field.querySelector('input[type="radio"]:checked');
    if (!selectedButton) {
      emptyCount++;
      highlightField(field);
    } else {
      hideBorder(field);
    }

  });
  return emptyCount;
}

function validateAndHighlightEmptyCheckBoxFields(fields) {
  let emptyCount = 0;
  fields.forEach(field => {
    let selectedButton = field.querySelector('input[type="checkbox"]:checked');
    if (!selectedButton) {
      emptyCount++;
      highlightField(field);
    } else {
      hideBorder(field);
    }

  });
  return emptyCount;
}

// ------------------------------------- Function for getting fieldset value with radio buttons -----------------------------
function getRadioValue(fieldId) {
  let result = "";
  const fieldset = document.getElementById(fieldId);
  fieldset.querySelectorAll('input[type="radio"]').forEach((radio) => {
    if (radio.checked) {
      result = radio.value;
    }
  });
  return result;
}

// ------------------------------------- Function for getting fieldset value with checkboxes -----------------------------
function getCheckedValues(fieldId) {
  let result = [];
  const fieldset = document.getElementById(fieldId);
  fieldset.querySelectorAll('input[type="checkbox"].item').forEach((checkbox) => {
    if (checkbox.checked) {
      result.push(checkbox.value);
    }
  });
  return result;
}

// ------------------------------------- Function for all of the above checkbox ----------
const computerFamiliarityAllOption = document.querySelector('#computerFamiliarity7');
computerFamiliarityAllOption.addEventListener('click', () => {
  const parent = computerFamiliarityAllOption.parentElement.parentElement;
  const allOptions = [...parent.querySelectorAll('input[type="checkbox"]')].filter(item => item !== computerFamiliarityAllOption);
  if (computerFamiliarityAllOption.checked) {
    allOptions.forEach(option => {
      option.checked = true;
      option.disabled = true;
    });
  } else {
    allOptions.forEach(option => {
      option.checked = false;
      option.disabled = false;
    });
  }

});



// Functions to show nd hide:
/**
 * 
 * @param {[input]} field [input field to manipulate and show in the page]
 * 
 */
function showInput(field) {
  field.setAttribute("required", true);
  if (field.tagName === "INPUT") {
    field.classList.add("validate-input");
  }
  field.classList.remove("hidden")
  field.style.display = "block";

}
/**
 * 
 * @param {*} field Hides input tags
 */
function hideInput(field) {
  field.setAttribute("required", false);
  field.classList.remove("validate-input");
  field.classList.add("hidden")
  field.value = "";
  field.style.display = "none";
}

function showDropDown(field) {
  field.style.display = "block";
  field.setAttribute("required", true);
  if (field.tagName === "SELECT") {
    field.classList.add("validate-dropdown");
  }
  field.classList.remove("hidden")
}
function hideDropDown(field) {
  field.style.display = "none";
  field.setAttribute("required", false);
  field.classList.remove("validate-dropdown");
  field.classList.add("hidden")
  field.value = null;
}

// -------------------------------------
function getToken() {
  let params = new URL(document.location).searchParams;
  return params.get("token");
}
const token = getToken();

const apiurl = `YOUR API${token}`;

const photoUrl = `YOUR API${token}`

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//-------------------------------------

let reagent_field = document.querySelector("#instituteCurrentType");
let submit_btn = document.querySelector("#submit");
let all_input = document.querySelectorAll("input");
let drop_down = document.querySelectorAll("select");
let cp_family = document.getElementById("computerFamiliarity");
let textArea = document.querySelectorAll("textarea");
var uploadField = document.getElementById("#uploadFile");
var familiarity_Eng = document.getElementById("#questionEnglishFamiliarity");
let transcriptImageHash = "";

const allMandatoryFieldSets = [...document.querySelectorAll('.validate-selectfield'),
...document.querySelectorAll('.validate-checkboxfield')];
allMandatoryFieldSets.forEach(fieldset => {
  const alloptions = [...fieldset.querySelectorAll('input')];
  alloptions.forEach(option => {
    option.addEventListener('click', () => {
      if (option.value) {
        hideBorder(fieldset);
      }
    });
  });
});

const allInputFields = [...document.querySelectorAll('input'),
...document.querySelectorAll('select')];

allInputFields.forEach(field => {
  field.addEventListener('change', () => {
    if (field.value || field.target?.value) {
      unHighlightField(field);
    } else if (field.classList.contains("validate-input") || field.classList.contains("validate-dropdown")) {
      highlightField(field);
    }
  });
});


function getCurrentURL() {
  return window.location.href;
}
var isSubmit = false;


async function uplodImage() {
  const photo = document.getElementById("uploadFile").files[0]; // file from input
  if (!photo) {
    return null;
  }
  console.log("photo = ", photo);

  let req = new XMLHttpRequest();
  let formData = new FormData();

  formData.append("image", photo);
  console.log("image = ", photo);

  var requestOptions = {
    method: "POST",
    headers: {
      'accept': 'application/json'
    },
    body: formData,
    redirect: "follow",
  };
  const response = await fetch(
    photoUrl,
    requestOptions
  );
  if (response.ok) {
    const jsonResponse = await response.json();
    alert("عکس شما با موفقیت بارگذاری شد");
    return jsonResponse.fileName;
  } else {
    throw new Error("Image upload failed");
    alert("عکس شما بارگذاری نشد");
  }

}

// ----------------------------- set action for isCurrentlyStudent ----------------------
document.querySelector('#isCurrentlyStudent').addEventListener('change', (e) => {
  const currentInstituteType = document.querySelectorAll('.instituteCurrentType');
  const currentInstituteName = document.querySelectorAll('.currentInstName');
  if (e.target.value === 'true') {
    currentInstituteType.forEach(field => {
      showDropDown(field);
    });
    currentInstituteName.forEach(field => {
      showInput(field);
    });


  } else {
    currentInstituteType.forEach(field => {
      hideDropDown(field);
    });
    currentInstituteName.forEach(field => {
      hideInput(field);
    });
  }

});

// ----------------------------- set action for jobStatus ----------------------
document.querySelector('#jobStatus').addEventListener('change', (e) => {
  const employedFields = document.querySelectorAll('.hastam');
  const unemployedFields = document.querySelectorAll('.nistam');

  if (e.target.value === "مشغول کار منجر به درآمد هستم") {
    employedFields.forEach(field => {
      showDropDown(field);
    });
    unemployedFields.forEach(field => {
      hideDropDown(field);

    });
  } else if (e.target.value === "مشغول کار منجر به درآمد نیستم") {
    employedFields.forEach(field => {
      hideDropDown(field);
    });
    unemployedFields.forEach(field => {
      showDropDown(field);
    });
  } else {
    employedFields.forEach(field => {
      hideDropDown(field);
    });
    unemployedFields.forEach(field => {
      hideDropDown(field);
    });
  }
});

// ----------------------------- set action for jobStandby ----------------------

async function getFormValues() {

  try {
    console.log("try start")

    transcriptImageHash = await uplodImage();

    console.log("try finish")
  } catch (error) {
    console.error(error);
    throw error;
  }

  let rawFormValues = JSON.stringify({
    transcriptImageAddress: transcriptImageHash,
    instituteType: document.getElementById("instituteType").value,
    lastInstitute: document.getElementById("lastInstitute").value,
    isCurrentlyStudent: document.getElementById("isCurrentlyStudent").value,
    cgpa: document.getElementById("cgpa").value,
    instituteCurrentType: document.getElementById("instituteCurrentType").value,
    currentInstName: document.getElementById("currentInstName").value,
    currentField: document.getElementById("currentField").value,

    skills: document.getElementById("skills").value,

    jobStatus: job,
    noneJobActivation: getCheckedValues("noneJobActivation"),
    employmentType: document.getElementById("employmentType").value,
    avgSalary: document.getElementById("avgSalary").value,
    employmentTimeCommitment: document.getElementById("employmentTimeCommitment").value,
    jobTitle: document.getElementById("jobTitle").value,
    accessTime: document.getElementById("accessTime").value,
    jobStandby: document.getElementById("jobStandby").value,
    jobVision: document.getElementById("jobVision").value,
    webDevFamiliarity: document.getElementById("webDevFamiliarity").value,

    computerFamiliarity: getCheckedValues("computerFamiliarity"),

    computerAccess: document.getElementById("computerAccess").value,
    internetAccessDevice: document.getElementById("internetAccessDevice").value,
    internetAccessTiming: document.getElementById("internetAccessTiming").value,
    codingKnowledge: document.getElementById("codingKnowledge").value,

    limitTime: document.getElementById("limitTime").value,
    motivation: document.getElementById("motivation").value,

    questionCity: getRadioValue("questionCityFieldset"),
    questionStudents: getRadioValue("questionStudents"),
    questionNumbers: getRadioValue("questionNumbers"),
    questionDiameters: getRadioValue("questionDiameters"),
    questionMultiplication: getRadioValue("questionMultiplication"),
    questionWords: getRadioValue("questionWords"),
    levelDiscreteMath: getRadioValue("levelDiscreteMath"),
    levelLinearAlgebra: getRadioValue("levelLinearAlgebra"),
    levelProbabilities: getRadioValue("levelProbabilities"),
    levelFlowDiagrams: getRadioValue("levelFlowDiagrams"),
    levelAlgorithms: getRadioValue("levelAlgorithms"),
    levelDataStructures: getRadioValue("levelDataStructures"),
    levelLogics: getRadioValue("levelLogics"),
    questionEnglishFamiliarity: getRadioValue("questionEnglishFamiliarity"),

    engPara: document.getElementById("engPara").value,

    applicantAdditionalComments: document.getElementById("applicantAdditionalComments").value,
  });

  return rawFormValues;

}




submit_btn.addEventListener('click', async (e) => {
  e.preventDefault();

  const allInputFields = [...document.querySelectorAll('.validate-input')];
  const allDropdowns = [...document.querySelectorAll('.validate-dropdown')];
  const allSelectFields = [...document.querySelectorAll('.validate-selectfield')];
  const allCheckBoxFields = [...document.querySelectorAll('.validate-checkboxfield')]

  const emptyInputCount = validateAndHighlightEmptyFields(allInputFields);
  const emptyDropdownCount = validateAndHighlightEmptyFields(allDropdowns);
  const emptySelectfieldCount = validateAndHighlightEmptySelectFields(allSelectFields);
  const emptyChechBoxFieldsCount = validateAndHighlightEmptyCheckBoxFields(allCheckBoxFields);

  const totalEmptyFields = emptyInputCount + emptyDropdownCount + emptySelectfieldCount + emptyChechBoxFieldsCount;


  if (totalEmptyFields > 0) {
    alert("لطفا تمام بخش های اجباری فرم را تکمیل نمایید ");
  } else {

    console.log("apiurl = " + apiurl);

    try {
    const raw = await getFormValues();
    console.log(raw)
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };
      fetch(apiurl, requestOptions)
        .then((response) => {
          if (response.ok) {
            alert('اطلاعات شما با موفقیت ثبت شد');
            window.location.href = "YOUR LINK";
          } else if (response.status === 409) {
            throw new Error(".فرم شما ثبت نشد. لطفا جهت اطلاعات بیشتر تماس بگیرید");
          }
          return response.text();
        })
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error:", error);
      alert('خطا در ثبت اطلاعات - لطفا مجددا تلاش کنید و درصورت تکرار خطا در ثبت تماس بگیرید');
    }
  }
});

var uploadField = document.getElementById("uploadFile");

uploadField.onchange = function () {
  if (this.files[0].size > 5242880) {
    alert("حجم فایل آپلودی شما زیاد است!");
    this.value = "";
  }
};

const fileInput = document.getElementById("uploadFile");
fileInput.addEventListener("change", previewImage);

function previewImage() {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      previewImage.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
}

const ta = document.getElementById("engPara");
ta.addEventListener(
    'keypress',
    function (e) {
        if (e.keyCode >255) {
            alert('Type in English Please');
            e.preventDefault();
        }
    }
);