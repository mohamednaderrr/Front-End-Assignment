function Shape() {
    if (this.constructor === Shape) {
        throw new Error("Cannot create an instance of Shape directly.");
    }

    Shape.count++;
}
//start count
Shape.count = 0;

Shape.getObjectCount = function () {
    if (Shape.count === 0) {
        return 'No shapes have been created yet.';
    } else if (Shape.count === 1) {
        return 'There is 1 shape created.';
    } else {
        return 'There are ' + Shape.count + ' shapes created.';
    }
};

function Rectangle(width, height) {
    Shape.call(this); //calling (inhertance)

    this.width = width;
    this.height = height;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
//calc Area
Rectangle.prototype.calculateArea = function () {
    return this.width * this.height;
};
//calcPerimeter
Rectangle.prototype.calculatePerimeter = function () {
    return 2 * (this.width + this.height);
};
//Display Info Function
Rectangle.prototype.displayInfo = function () {
    console.log(
        'Rectangle Info: \n' +
        'Width: ' + this.width + '\n' +
        'Height: ' + this.height + '\n' +
        //Mohamed Nader
        'Area: ' + this.calculateArea() + '\n' +
        'Perimeter: ' + this.calculatePerimeter()
    );
};
//To String Function
Rectangle.prototype.toString = function () {
    return 'Rectangle Info: \n' +
        'Width: ' + this.width + ', \n' +
        'Height: ' + this.height + ', \n' +
        'Area: ' + this.calculateArea() + ', \n' +
        'Perimeter: ' + this.calculatePerimeter();
};
//calling square
function Square(sideLength) {
    Rectangle.call(this, sideLength, sideLength);
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;
//Objects
var rect1 = new Rectangle(5, 10);
var square1 = new Square(7);

rect1.displayInfo();
square1.displayInfo();

console.log(rect1.toString());
console.log(square1.toString());

console.log(Shape.getObjectCount());





