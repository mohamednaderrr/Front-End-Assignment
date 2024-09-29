
// OUTPUT
const $outputYear = $(".output-year");
const $outputMonth = $(".output-month");
const $outputDay = $(".output-day");

// INPUT
const $inputYear = $("#year");
const $inputMonth = $("#month");
const $inputDay = $("#day");

// ERROR
const $errorYear = $(".error-year");
const $errorMonth = $(".error-month");
const $errorDay = $(".error-day");

// BUTTON EVENT
$(".sumbit-btn").click(CalculateDate);

// VALIDATIONS
$inputDay.on("input", validateDay);
$inputMonth.on("input", validateMonth);
$inputYear.on("input", validateYear);

function validateDay() {
    if (+$inputDay.val() > 31 || +$inputDay.val() === 0) {
        $errorDay.text("Must Be A Valid Date");
        return false;
    } else {
        $errorDay.text("");
        return true;
    }
}

function validateMonth() {
    if (+$inputMonth.val() > 12 || +$inputMonth.val() === 0) {
        $errorMonth.text("Must Be A Valid Date");
        return false;
    } else {
        $errorMonth.text("");
        return true;
    }
}

function validateYear() {
    if (+$inputYear.val() > 2024 || +$inputYear.val() === 0) {
        $errorYear.text("Must Be A Valid Date");
        return false;
    } else {
        $errorYear.text("");
        return true;
    }
}

function CalculateDate() {
    let isDayValid = validateDay();
    let isMonthValid = validateMonth();
    let isYearValid = validateYear();

    if (isDayValid && isMonthValid && isYearValid) {
        let birthday = `${$inputYear.val()}-${$inputMonth.val()}-${$inputDay.val()}`;
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

        $outputDay.text(ageDays);
        $outputMonth.text(ageMonths);
        $outputYear.text(ageYears);
    } else {
        alert("ERROR: Please Enter a Valid Date");
    }
}