const animalsDiv = document.getElementById("animals");
const buyCowButton = document.getElementById("buyCowButton");
const buyHenButton = document.getElementById("buyHenButton");
const feedAnimalsButton = document.getElementById("feedAnimalsButton");
const waterAnimalsButton = document.getElementById("waterAnimalsButton");
const sellProductsButton = document.getElementById("sellProductsButton");
const message = document.getElementById("message");
const moneyDisplay = document.getElementById("money");
const milkDisplay = document.getElementById("milk");
const eggsDisplay = document.getElementById("eggs");
const deleteDeadAnimals = document.querySelector("#deleteDeadAnimals");

let money = 500;
let milkCollected = 0;
let eggsCollected = 0;

class Animal {
  constructor(type, price, product, productCount) {
    this.type = type;
    this.price = price;
    this.product = product;
    this.productCount = productCount;
    this.isAlive = true;
    this.hunger = 0;
    this.thirst = 0;
  }

  feed() {
    if (this.isAlive) {
      this.hunger = Math.max(0, this.hunger - 1);
    }
  }

  water() {
    if (this.isAlive) {
      this.thirst = Math.max(0, this.thirst - 1);
    }
  }

  update() {
    if (this.isAlive) {
      this.hunger++;
      this.thirst++;
      if (this.hunger >= 5 || this.thirst >= 5) {
        this.isAlive = false;
        message.textContent += `${this.type} has died! `;
      }
    }
  }

  collectProduct() {
    if (this.isAlive) {
      if (this.product === "Milk") {
        milkCollected += this.productCount;
      } else if (this.product === "Eggs") {
        eggsCollected += this.productCount;
      }
      return true;
    }
    return false;
  }
}

let animals = [];

buyCowButton.addEventListener("click", () => {
  if (money >= 100) {
    const cow = new Animal("Cow", 100, "Milk", 1);
    animals.push(cow);
    money -= cow.price;
    updateFarmDisplay();
    updateStatsDisplay();
    message.textContent = "You bought a cow!";
  } else {
    message.textContent = "Not enough money to buy a cow!";
  }
});

buyHenButton.addEventListener("click", () => {
  if (money >= 50) {
    const hen = new Animal("Hen", 50, "Eggs", 1);
    animals.push(hen);
    money -= hen.price;
    updateFarmDisplay();
    updateStatsDisplay();
    message.textContent = "You bought a hen!";
  } else {
    message.textContent = "Not enough money to buy a hen!";
  }
});

feedAnimalsButton.addEventListener("click", () => {
  animals.forEach((animal) => animal.feed());
  message.textContent = "You fed all the animals!";
});

waterAnimalsButton.addEventListener("click", () => {
  animals.forEach((animal) => animal.water());
  message.textContent = "You watered all the animals!";
});

sellProductsButton.addEventListener("click", () => {
  if (milkCollected > 0 || eggsCollected > 0) {
    const milkValue = milkCollected * 10;
    const eggsValue = eggsCollected * 5;

    money += milkValue + eggsValue;
    milkCollected = 0;
    eggsCollected = 0;

    updateStatsDisplay();
    message.textContent = `Sold milk for $${milkValue} and eggs for $${eggsValue}. Total money: $${money}`;
  } else {
    message.textContent = "No products to sell!";
  }
});
deleteDeadAnimals.addEventListener("click", () => {
  const dead_animals = animalsDiv.querySelectorAll(".animal.dead");
  animals = animals.filter(animal => animal.isAlive != false);
});

function collectProducts() {
  animals.forEach((animal) => {
    if (animal.collectProduct()) {
      if (animal.product === "Milk") {
        message.textContent += "Collected 1 milk! ";
      } else if (animal.product === "Eggs") {
        message.textContent += "Collected 1 egg! ";
      }
    }
  });
}

function updateFarmDisplay() {
  animalsDiv.innerHTML = "";
  animals.forEach((animal) => {
    const animalDiv = document.createElement("div");
    animalDiv.classList.add("animal");
    animalDiv.textContent = `${animal.type} (Hunger: ${animal.hunger}, Thirst: ${animal.thirst})`;
    if (!animal.isAlive) {
      animalDiv.classList.add("dead");
      animalDiv.textContent += " - Dead";
    }
    animalsDiv.appendChild(animalDiv);
  });
}

function updateStatsDisplay() {
  moneyDisplay.textContent = `Money: $${money}`;
  milkDisplay.textContent = `Milk Collected: ${milkCollected}`;
  eggsDisplay.textContent = `Eggs Collected: ${eggsCollected}`;
}

function setTimer() {
  setInterval(() => {
    animals.forEach((animal) => animal.update());
    collectProducts();
    updateFarmDisplay();
    updateStatsDisplay();
  }, 3000);
}

setTimer();
