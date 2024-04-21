'use strict';

const Person = function (firstName, birthYear) {
  //Instance properties - are avaiavle on all Instances
  this.firstName = firstName;
  this.birthYear = birthYear;

  //BAD PRACTICE!
  // this.calcAge = function () {
  //   console.age(2037 - this.birthYear);
  // };
};
const jonas = new Person(`Jonas`, 1991);
const matilda = new Person(`Matilda`, 2017);
const jack = new Person(`Jack`, 1975);

//Static Method
// Person.hey = function () {
//   console.log(`hey there : D`);
// };
// Person.hey();

console.log(jonas, matilda, jack);

console.log(jonas instanceof Person);

// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
jonas.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));

Person.prototype.species = `Homo Sapiens`;
console.log(jonas, matilda);

// console.log(jonas.hasOwnProperty(`firstName`));
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

//console.dir - way to inspect Function inside of Terminal
console.dir(Person.prototype.constructor);

const arr = [3, 4, 4, 5, 5, 6, 6]; // [] === new Array()
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

// The way to add new Method to Array Constructor - all areays have now this method !
//Bad idea, cs just good instrument for u. New JS Version bugs //
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

//All elements behind the scene are Objects
const h1 = document.querySelector(`h1`);
console.dir(h1);
console.dir(x => x + 1);

//class expression
// const PersonCl = class {};

//class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //MEthods will be added to  .prototype property = instance Methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet = function () {
    console.log(`Hey ${this.fullName}`);
  };

  get age() {
    return 2037 - this.birthYear;
  }

  //Set a property that already exist !
  set fullName(name) {
    console.log(name);
    if (name.includes(` `)) this._fullName = name;
    else alert(`${name} is not a full name`);
  }
  get fullName() {
    return this._fullName;
  }
  //Static Method
  static hey() {
    console.log(`hey there : D`);
  }
}
const jessica = new PersonCl(`jessica Davis`, 1996);
jessica.calcAge();
console.log(jessica.age);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

//1. Classes are not  hoisted
//2 Classes are first-class citizes
//3. Classes are executed in strict mode

const walter = new PersonCl(`Walter Williams`, 1965);
// PersonCl.hey();

///////////////////////
//Setters and Getters
///////////////////////
const account = {
  owner: `Jonas`,
  movements: [10, 23, 44, 555],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);

////////////////
//Object.create
////////////////

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  //autom way to set programaticaly all prop.
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = `Steven`;
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
//autom way to set programaticaly all prop.
sarah.init(`Sarah`, 1997);
sarah.calcAge();

//////////////////////////////////////
//Inheritance between classes
//////////////////////////////////////

const Student = function (firstName, birthYear, course) {
  //Duplicate code :(
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  Person.call(this, firstName, birthYear);
  this.course = course;
};

//Linking Prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My Name is ${this.firstName} and I study ${this.course}`);
};
const mike = new Student(`Mike`, 20, `Computer Sicence`);
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

////////////////////////
//Another Class Ex.
////////////////////////

class Account {
  //1)Public Fields/(instances)
  local = navigator.language;

  //2) Private Fields
  #movements = [];
  #pin;

  constructor(ownerName, currency, pin) {
    this.ownerName = ownerName;
    this.currency = currency;
    //U can create as many Parameters aas u want, without adding them all accounts at the begininng
    // this.local = navigator.language;

    //Protected variables
    this._pin = pin;
    // this._movements = [];

    console.log(`Thanks for oppening an Account ${this.ownerName}`);
  }
  //Public Interface (API)

  //3) Public Methods
  getMovemets() {
    return this.#movements;
  }
  deposit(value) {
    this.#movements.push(value);
    return this;
  }
  withdraw(value) {
    this.deposit(-value);
    return this;
  }

  //This Methods should be ENCAPSULATED! Only requestLoan() should have access on approveLoan
  requestLoan(value) {
    if (this.#approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan approved`);
    }
    return this;
  }

  //4) Private Methods
  #approveLoan(value) {
    return true;
  }
  //Static Methods - are avaiable ONLY ON CLASS !!!(not Instances)
  static helper() {
    console.log(`Helper`);
  }
}
const acc1 = new Account(`Jonas`, `EUR`, 1234);

//Bad Practice
// acc1._movements.push(250);
// acc1._movements.push(-40);

// It is always a better way to CREATE METHODS for functionality of the site like movements functionality

acc1.deposit(150);
acc1.withdraw(20);
acc1.requestLoan(1000);
// console.log(acc1.#approveLoan(1000));

console.log(acc1.getMovemets());

console.log(acc1);
Account.helper();

//////////////////////////////////
//Privacy: Private Class Fields
//////////////////////////////////

//Public Fields
//Private Fields
//Public Methods
//Private Methods
//(there is aslo the static version)

////////////////////////////
//Chaining
////////////////////////////
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovemets());
