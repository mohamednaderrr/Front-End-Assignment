// 1- Create an Array
let Numbers = [12, 7, 5, 21, 18, 33, 8, 14]
console.log(Numbers);

// 2- Function to Calculate Sum:
function sumofNumber(Numbers) {
    let sum = 0;
    for (let a of Numbers)
        sum += a;
    return sum;
};
console.log(sumofNumber(Numbers));

//3- Function to Find Maximum
let maxNum = Math.max(...Numbers);
console.log(maxNum);

// 4- Function to Find Minimum
let minNum = Math.min(...Numbers);
console.log(minNum);

// 5- Function to Count Even and Odd Numbers
function countEvenOdd(Numbers) {
    let evenCount = 0;
    let oddCount = 0;

    for (let number of Numbers) {
        if (number % 2 === 0) {
            evenCount++;
        } else {
            oddCount++;
        }
    }

    return {
        even: evenCount,
        odd: oddCount
    };
}

const result = countEvenOdd([12, 7, 5, 21, 18, 33, 8, 14]);
console.log(result);

//6- Function to Generate a Report
function generateReport(Numbers) {
    const counts = countEvenOdd(Numbers);

    const report = `Report:
- Araay: ${[12, 7, 5, 21, 18, 33, 8, 14]}
- SUM: ${sumofNumber(Numbers)}
- Maxium: ${maxNum}
- Minium: ${minNum}
- Even numbers: ${counts.even}
- Odd numbers: ${counts.odd}`;

    return report;
}
const numbersArray = [12, 7, 5, 21, 18, 33, 8, 14];
const report = generateReport(numbersArray);
console.log(report);