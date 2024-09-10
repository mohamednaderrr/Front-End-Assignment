//1- Reverse a String
var str = "Hello";
console.log(str);

var output = str.split('').reverse().join('');
console.log(output);


//2- Find Factorial
function findfactorial(num) {
    let factorial = 1;
    if (num < 0) return;
    for (let i = num; i > 0; i--) {
        factorial *= i;
    }
    return factorial;
}
findfactorial(5)

// 3- Merge Objects
function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

console.log(mergeObjects(obj1, obj2));

//4- Toggle Boolean
function toggleBoolean(bool) {
    return !bool;
}

console.log(toggleBoolean(true));
console.log(toggleBoolean(false));