// Mohamed Nader Rashad
//Example 1
function b() {
    var myvar = 1; //output
    console.log(myvar);
}
console.log(x);
a();
b();
function a() {
    var myvar = 2; //output
    console.log(myvar);
}
var x = 5;



// Example 2
function f1(x1, y1) {
    if (x1 > 3) {
        var z = 3;
    }
    else {
        var zz = 3;
    }
    console.log(z, zz);
    zzz = 300;
}
f1(1, 3);
console.log(zzz);
// هيطبع  undefinted,3 ,300

// Example 3
function b1() {
    myvar1 = 3;
    console.log(myvar1);
}
function a1() {
    var myvar1 = 2;
    console.log(myvar1); //output
    b1();
}
var myvar1 = 1;
console.log(myvar1); //output 
a1();
console.log(myvar1); //output 

// Example 4
function b2() {
    //var myvar2
    console.log(myvar2);//output ->1
}
function a2() {
    var myvar2 = 2;
    console.log(myvar2);//output ->2
    b2();
}
var myvar2 = 1;
console.log(myvar2); //output ->1
a2();
console.log(myvar2);//output ->1

// Example 5
// function b3() {
//     console.log(myvar3);
// }
function a3() {
    var myvar3 = 2;
    console.log(myvar3); //output-> 2
    // b3();
}
a3();
// console.log(myvar3);
//error beacuse is myvar3 is not definited

// Example 6
// changing the lexical scope
function a4() {
    function b4() {
        console.log(myvar4); //output ->2
    }
    var myvar4 = 2;
    console.log(myvar4);//output ->2
    b4()
}
a();
// console.log(myvar4);  //undeifinted

// Example 7
function square(num) {
    total = num * num;
    return total;
}
var total = 50;
var number = square(50);
alert(total);

//output is 25000



