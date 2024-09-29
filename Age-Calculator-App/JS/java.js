// OUTPUT
const output_year = document.querySelector(".output-year");
const output_month = document.querySelector(".output-month");
const output_day = document.querySelector(".output-day");
const sumbit_btn = document.querySelector(".sumbit-btn");

// INPUT
const input_year = document.querySelector("#year");
const input_day = document.querySelector("#day");
const input_month = document.querySelector("#month");

// ERROR
const error_day = document.querySelector(".error-day");
const error_month = document.querySelector(".error-month");
const error_year = document.querySelector(".error-year");

sumbit_btn.addEventListener('click', CalculateDate);

input_day.addEventListener("input", validateDay);
input_month.addEventListener("input", validateMonth);
input_year.addEventListener("input", validateYear);

function validateDay() {
    if (+input_day.value > 31 || +input_day.value === 0) {
        error_day.textContent = "Must Be A Valid Date";
        return false;
    } else {
        error_day.textContent = "";
        return true;
    }
}

function validateMonth() {
    if (+input_month.value > 12 || +input_month.value === 0) {
        error_month.textContent = "Must Be A Valid Date";
        return false;
    } else {
        error_month.textContent = "";
        return true;
    }
}

function validateYear() {
    if (+input_year.value > 2024 || +input_year.value === 0) {
        error_year.textContent = "Must Be A Valid Date";
        return false;
    } else {
        error_year.textContent = "";
        return true;
    }
}

function CalculateDate() {
    let isDayValid = validateDay();
    let isMonthValid = validateMonth();
    let isYearValid = validateYear();

    if (isDayValid && isMonthValid && isYearValid) {
        let birthday = `${input_year.value}-${input_month.value}-${input_day.value}`;
        console.log(birthday);
        let today = new Date();
        let birthdayObj = new Date(birthday);

        let ageYears = today.getFullYear() - birthdayObj.getFullYear();
        let ageMonths = today.getMonth() - birthdayObj.getMonth();
        let ageDays = today.getDate() - birthdayObj.getDate();

        
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

    
        if (ageDays < 0) {
            ageMonths--;
        
            let lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += lastMonth.getDate();
        }

        output_day.textContent = ageDays;
        output_month.textContent = ageMonths;
        output_year.textContent = ageYears;
    } else {
        alert("ERROR Please Enter Valid Date");
    }
}
