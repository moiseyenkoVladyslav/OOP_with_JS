'use strict';

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.acclerate = function () {
  this.speed = this.speed + 10;
  console.log(`New speed of ${this.make} is ${this.speed}km/h`);
};
Car.prototype.brake = function () {
  this.speed = this.speed - 5;
  console.log(`New speed of ${this.make} is ${this.speed}km/h`);
};

const honda = new Car(`Honda`, 23);
const bmw = new Car(`BMW`, 120);
const mercedes = new Car(`Mercedes`, 95);

console.log(honda);
console.log(bmw);
console.log(mercedes);

honda.acclerate();
bmw.acclerate();
mercedes.acclerate();

honda.brake();
bmw.brake();
mercedes.brake();


//Challenge 3 
class CarCl {
  //creating a constructor for class
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  acclerate = function () {
    this.speed = this.speed + 10;
    console.log(`New speed of ${this.make} is ${this.speed}km/h`);
    return this;
  };
  brake = function () {
    this.speed = this.speed - 5;
    console.log(`New speed of ${this.make} is ${this.speed}km/h`);
    console.log(`\n`);
    return this;
  };
  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

//Data :Ford at 120km/h
const ford = new CarCl(`Ford`, 120);
console.log(ford.speedUS);
ford.speedUS = 20;
console.log(ford);

//Data: Porsche at 200 km/h
const porsche = new CarCl(`Porsche`, 200);
console.log(porsche);
porsche.brake();
porsche.acclerate();
porsche.acclerate();
porsche.acclerate();
porsche.brake();

console.log(porsche.speedUS);

porsche.speedUS = 50;

console.log(porsche.speed);

const Ev = function (make, speed, charge) {
  Car.call(this, make, speed);

  this.charge = charge;
  // this.par = this.charge.slice(0, this.charge.length - 1);
};
Ev.prototype = Object.create(Car.prototype);
const tesla = new Ev(`Tesla`, 120, `23%`);

Ev.prototype.chargeBattery = function (chargeTo) {
  this.charge = `${chargeTo}%`;
  console.log(`Battery chared to ${chargeTo}%`);
};
Ev.prototype.acclerate = function () {
  if (Number(this.charge.slice(0, this.charge.length - 1)) === 0) {
    console.log(`No energy! Load battery.`);

    return;
  }
  this.speed += 20;
  this.charge = `${Number(this.charge.slice(0, this.charge.length - 1)) - 1}%`;
  console.log(
    `${this.make} going on ${this.speed}km/h with charge of ${this.charge}`
  );
};
tesla.acclerate();
// tesla.acclerate();
// tesla.acclerate();
// tesla.acclerate();
// tesla.acclerate();
// tesla.acclerate();
// tesla.acclerate();

tesla.chargeBattery(75);
tesla.acclerate();
tesla.brake();
tesla.brake();
console.log(tesla.charge);
tesla.acclerate();
console.log(tesla);

////////////////
//Challenge 4
////////////////
class EVCL extends CarCl{

  #charge;
  constructor(make,speed,charge){
    super(make,speed);
    this.#charge=charge;
  }
  showCharge=function(){
    console.log(`The charge is ${this.#charge}%`);
  }

  chargeBattery=function(chargeTo){
    this.#charge=chargeTo;
    console.log(`The battery would charge to the ${this.#charge}%`)
    console.log(`\n`);
    return this;
  }
  acclerate=function(){
    
   
    if(this.#charge ===1){
      console.log(`The charge is 1%,be carefull`);
    }
    if(this.#charge === 0){
      console.log(`The power of the battery is low. Please load the battery!`)
      return 0;
    }
    this.speed+=20;
    console.log(`New speed of Rivian is ${this.speed}km/h`)
    this.#charge-=1;

    //status of battery now 
    console.log(`Current battery status is ${this.#charge}%`);
    console.log(`\n`);
    return this;
  }
}
//Data: `Rivian` 120km/h, 23%
const rivian = new EVCL(`Rivian`,120,2);
console.log(rivian);
// console.log(rivian.showCharge());
// rivian.chargeBattery(25);
rivian.acclerate().brake().acclerate().brake().chargeBattery(20).acclerate();
console.log(rivian.speedUS);

//digest - переваривтаь