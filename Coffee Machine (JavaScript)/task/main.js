// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

function CaffeMachine() {
  this.water = 400;
  this.milk = 540;
  this.coffeeBeans = 120;
  this.cups = 9;
  this.money = 550;
  this.coffeTypes = {
    espresso: {water: 250, milk: 0, coffeeBeans: 16, price: 4},
    late: {water: 350, milk: 75, coffeeBeans: 20, price: 7},
    cappuccino: {water: 200, milk: 100, coffeeBeans: 12, price: 6},
    doppio: {water: 500, milk: 0, coffeeBeans: 32, price: 6}
  }
  this.writeStats = function (){
    console.log(`The coffee machine has:
    ${this.water} ml of water
    ${this.milk} ml of milk
    ${this.coffeeBeans} g of coffee beans
    ${this.cups} disposable cups
    $${this.money} of money\n`)
  };
  this.avalibleAmount = function(coffeeType) {
    return parseInt(Math.min(this.water/this.coffeTypes[coffeeType]['water'], this.milk/this.coffeTypes[coffeeType]['milk'], this.coffeeBeans/this.coffeTypes[coffeeType]['coffeeBeans']));
  };
  this.buy = function(){
    let coffeeType = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, 4 - doppio, back - go to main menu: ");
    let coffeeName;
    switch (coffeeType){
      case "1":
        coffeeName = 'espresso';
        break
      case "2":
        coffeeName = 'late';
        break
      case "3":
        coffeeName = 'cappuccino';
        break
      case "4":
        coffeeName = 'doppio';
        break
      case 'back':
        return 0;
      default:
        console.log('Wrong coffee type!');
        this.buy();
    }
    let availableAmount = this.avalibleAmount(coffeeName);
    if(availableAmount && this.cups){
      this.water -= this.coffeTypes[coffeeName].water;
      this.milk -= this.coffeTypes[coffeeName].milk;
      this.coffeeBeans -= this.coffeTypes[coffeeName].coffeeBeans;
      this.cups -= 1;
      this.money += this.coffeTypes[coffeeName].price;
    } else {
      console.log('Sorry, we are out of ingredients :(')
    }
  }
  this.fill = function() {
    this.water += parseInt(input("Write how many ml of water you want to add:"));
    this.milk += parseInt(input("Write how many ml of milk you want to add:"));
    this.coffeeBeans += parseInt(input("Write how many grams of coffee beans you want to add:"));
    this.cups += parseInt(input("Write how many disposable cups you want to add:"));
  }
  this.take = function (){
    console.log(`I gave you $${this.money}`);
    this.money = 0;
  }
  this.start = function (){
    let work = true
    do{
    let action = input("Write action (buy, fill, take, remaining, exit): ");
    switch(action){
      case 'buy':
        this.buy();
        break
      case 'fill':
        this.fill();
        break
      case  'take':
        this.take();
        break
      case 'remaining':
        this.writeStats();
        break
      case 'exit':
        work = false;
        break
      default:
        console.log('Wrong command!, try again...');
        this.start();
    };
    }while (work);

  }
}
const myCoffeeMachine = new CaffeMachine();
myCoffeeMachine.start()
