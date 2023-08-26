let institute_dropDown = document.querySelector('.instituteCurrentType');
let institute_input = document.querySelector('#currentInstName');
let institute_currentField = document.querySelector('#currentField');
let institute_Type = document.querySelector('#instituteType');
let upload_file = document.querySelector('#uploadFile');

let job_status = document.querySelector('#jobStatus');
let job_title = document.querySelector('#jobTitle');
let job_time = document.querySelectorAll('#workTime');
let job_avg = document.querySelector('#avgSalary');
let job_access = document.querySelectorAll('#accessTime');
let job_activity = document.querySelectorAll('#noneJobActivation')
let job_free = document.querySelectorAll('#freeDailyTime')
let computer_family = document.querySelectorAll('#computerFamiliarity')
let cpr_family = document.querySelectorAll('.disable')
let cpr_all = document.querySelectorAll('.enable')

let checkbox_item = document.querySelectorAll('.item');
function myFunction() {
    computer_family.forEach((item)=>{
        if(item.value == "همه موارد" && item.checked){
            checkbox_item.forEach((items)=>{
                items.disabled = true;
            })
        }else{
            checkbox_item.forEach((items)=>{
                item.checked= false;
                items.disabled = false;
            })
        }

    })
}


// مشغول به تحصیل--------------------------
var current_student = "";
function instituteTypeChanged(e){
    
    if(e.value == "true"){
        showHasDocument();
        current_student = true;    
    }
    else
    {
        hiddenHasDocument();
        current_student = false;
    }
}
function showHasDocument(){
    var hasDocumentElements = document.querySelectorAll('.hasdocument');
    for(let elem of hasDocumentElements){
        elem.classList.remove('hidden');
    }
}
function hiddenHasDocument(){
    var hasDocumentElements = document.querySelectorAll('.hasdocument');
    for(let elem of hasDocumentElements){
        elem.classList.add('hidden');
    }
}

// درآمد نیستم ----------------------
function jobStatusChanged(e){
    if(e.value == 'مشغول کار منجر به درآمد نیستم'){
        showNistam();
        hiddenHastam();
        job = false;
    }
    else
    {
        showHastam();
        hiddenNistam();
        job = true;
    }
    if(e.value == ""){
        hiddenNistam();
        hiddenHastam();
    }
}

function showHastam(){
    var hasDocumentElements = document.querySelectorAll('.hastam');
    for(let elem of hasDocumentElements){
        elem.classList.remove('hidden');
        job_title.required = true;
        job_avg.required = true;
        employmentTimeCommitment.required = true;
        employmentType.required = true;
    }
}
function hiddenHastam(){
    var hasDocumentElements = document.querySelectorAll('.hastam');
    for(let elem of hasDocumentElements){
        elem.classList.add('hidden');
        job_title.required = false;
        job_avg.required = false;
        employmentTimeCommitment.required = false;
        employmentType.required = false;
    }
}
function showNistam(){
    var hasDocumentElements = document.querySelectorAll('.nistam');
    for(let elem of hasDocumentElements){
        elem.classList.remove('hidden');
    }
}
function hiddenNistam(){
    var hasDocumentElements = document.querySelectorAll('.nistam');
    for(let elem of hasDocumentElements){
        elem.classList.add('hidden');
    }
}

// computerFamiliarity

const computerFamiliarity = [
  {
    value: "هر کامپیوتر یا لپتاپ جدیدی را می توانم روشن کنم و با آن شروع به کار کنم.",
    label: "هر کامپیوتر یا لپتاپ جدیدی را می توانم روشن کنم و با آن شروع به کار کنم.",
  },
  {
    value: "می توانم در ویندوز، پوشه (Folder) جدید ایجاد کنم و فایل های خودم را در آن کپی (Copy-Paste) کنم.",
    label: "می توانم در ویندوز، پوشه (Folder) جدید ایجاد کنم و فایل های خودم را در آن کپی (Copy-Paste) کنم.",
  },
  {
    value: "می توانم اطلاعات را با استفاده از فلش (USB Flash Disk) از یک کامپیوتر به کامپیوتر دیگر انتقال دهم.",
    label: "می توانم اطلاعات را با استفاده از فلش (USB Flash Disk) از یک کامپیوتر به کامپیوتر دیگر انتقال دهم.",
  },
  {
    value: "می توانم از نرم افزار Word برای تایپ نامه، از Powerpoint برای تهیه ارائه ها و از Excel برای حسابداری شخصی استفاده کنم",
    label: "می توانم از نرم افزار Word برای تایپ نامه، از Powerpoint برای تهیه ارائه ها و از Excel برای حسابداری شخصی استفاده کنم",
  },
  {
    value: "از برنامه های Skype، Zoom یا Google Meet برای تماس های تصویری استفاده می کنم.",
    label: "از برنامه های Skype، Zoom یا Google Meet برای تماس های تصویری استفاده می کنم.",
  }, 
  {
    value: "می توانم حین یک تماس تصویری، صفحه نمایش کامپیوترم را به طور زنده با دیگران به اشتراک بگذارم.",
    label: "می توانم حین یک تماس تصویری، صفحه نمایش کامپیوترم را به طور زنده با دیگران به اشتراک بگذارم.",
  },
  {
    value: "همه موارد",
    label: "همه موارد",
  },
];



const noneJobActivation = [
    {
        value:  "آموزش غیر آکادمیک ( مانند کلاس ورزش حرفه ای و کلاس زبان و غیره)",
        lable:  "آموزش غیر آکادمیک ( مانند کلاس ورزش حرفه ای و کلاس زبان و غیره)",
    },
    {
        value: "خانه دار",
        lable: "خانه دار",
    },
    {
        value: "جویای کار",
        lable: "جویای کار",
    },
    {
        value: "دانش آموز/ دانشجو",
        lable: "دانش آموز/ دانشجو",
    }
]