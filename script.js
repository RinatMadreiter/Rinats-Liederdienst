let names = ['Pizza Margherita', 'Pizza Funghi', 'Pizza Salami', 'Pizza Prosciutto', 'Pizza Hawaii', 'Pizza Tonno', 'Pizza Mista', 'Pizza Verdure', 'Pizza Orient', 'Pizza Montreal'];
let mealDescriptions = ['', 'mit frischen Champignons', 'mit Rindersalami', 'mit Putenschinken', 'mit Putenschinken und Ananas', 'mit Thunfisch und roten Zwiebeln', 'mit Rindersalami, Putenschinken, Peperoni und Champignons', 'mit Broccoli, Champignons und Paprika', 'mit Knoblauchwurst, roten Zwiebeln und Oliven', 'mit Spinat und Gorgonzola'];
let prices = [5.90, 6.90, 6.90, 6.90, 7.10, 7.10, 7.40, 7.50, 7.50, 7.40];
let amount = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

let addedNames = [];
let addedPrices = [];
let addedAmount = [];

let calculatedTotalSum = 0;
let indexcompare;


/**
 * generates all available pizzas to order
 */
function renderPizzas() {
    document.getElementById('renderedPizzasDiv').innerHTML += "";
    for (let i = 0; i < names.length; i++) {
        document.getElementById('renderedPizzasDiv').innerHTML += generatePizzaHTML(i)
    }
}


/**
 * @param {*} index 
 * @returns innerHTML of Pizzas
 */
function generatePizzaHTML(index) {
    return `
    <div class="listedDishes" onclick="addToBasket(${index})">
        <span class="d1">${names[index]}</span>
        <span class="d2">${mealDescriptions[index]}</span>
        <span class="d3">${prices[index].toFixed(2)} €</span>
        <img src="./img/plus.png" class="plus">
    </div>
    `;
}


/**
 * keeps the basket on top when scrolled down
 */
function scrollBasket() {
    if (window.scrollY < 72) {
        document.getElementById("basket").style.top = (72 - window.scrollY) + 'px';
    } else {
        document.getElementById("basket").style.top = '0px';
    }
}


/**
 * adds dish to the basket
 */
function addToBasket(i) {
    if (addedNames.includes(names[i])) {
        indexcompare = addedNames.indexOf(names[i]);
        add1(indexcompare);
    } else {
        addedNames.push(names[i]);
        addedPrices.push(prices[i]);
        addedAmount.push(amount[i]);
        saveBasket();
        renderBasket();
    }
}


/**
 * saves prices & dishes & amount in localstorage
 */
function saveBasket() {
    let addedNamesAsText = JSON.stringify(addedNames);
    localStorage.setItem('addedNames', addedNamesAsText);
    let addedPricesAsText = JSON.stringify(addedPrices);
    localStorage.setItem('addedPrices', addedPricesAsText);
    let addedAmountAsText = JSON.stringify(addedAmount);
    localStorage.setItem('addedAmount', addedAmountAsText);
}


/**
 * loads the prices & dishes & amount from localstorage
 */
function loadBasket() {
    let addedNamesAsText = localStorage.getItem('addedNames');
    let addedPricesAsText = localStorage.getItem('addedPrices');
    let addedAmountAsText = localStorage.getItem('addedAmount')
    if (addedNamesAsText && addedPricesAsText && addedAmountAsText) {
        addedNames = JSON.parse(addedNamesAsText);
        addedPrices = JSON.parse(addedPricesAsText);
        addedAmount = JSON.parse(addedAmountAsText);
    }
}


/**
 * 1) Loads arrays from Storage 
 * 2) Generates baskets innerHTML
 * 3) Calculates total-sum
 */
function renderBasket() {
    loadBasket();
    renderBasketitems();
    calcTotalSum();
}


/**
 * Render baskets items 
 * * Used in  renderBasket()
 * * Generate BasketsInnerHTML with generateBasketsInnerHTML()
 */
function renderBasketitems() {
    let dishesInBasket = document.getElementById('basketContent');
    if (addedNames.length < 1) {
        dishesInBasket.innerHTML = `
        <img class="basketimg" src="./img/basket.png">
        <p>Wähle leckere Gerichte aus der Karte und bestelle Dein Menü.</p>
        `;
    } else {
        dishesInBasket.innerHTML = "";
        for (let i = 0; i < addedNames.length; i++) {
            dishesInBasket.innerHTML += generateBasketsInnerHTML(i)
        }
    }
}


/**
 * generateBasketsInnerHTML
 * @param {*} index2 
 * @returns BasketsInnerHTML
 */
function generateBasketsInnerHTML(index2) {
    return `
    <div class="basketItem">
        <span>${addedAmount[index2]}</span>
        <span class="namesBasket">${addedNames[index2]}</span>
        <span class="addremove" onclick="remove1(${index2})">-</span>
        <span class="addremove" onclick="add1(${index2})">+</span>
        <img src="./img/penblue.png">
        <span class="linesum">${addedPrices[index2].toFixed(2)}€</span>
        <img src="./img/trashblue.png" class="trash" onclick="removeItem(${index2})">
    </div>
    `;
}

/**
 * 1) Alerts the customer about succesfull purchase
 * 2) Empties all arrays
 * 3) Renders basket
 */
function buy() {
    if (addedNames.length >= 1) {
        addedNames = [];
        addedPrices = [];
        addedAmount = [];
        saveBasket();
        renderBasket();
        alert("Die Pizzas werden in 30 Minuten an ihre Adresse geliefert! \n\n\n\n  Wir wünschen Ihnen einen Guten Appetit!");
    }
}


/**
 * 1) Remove the klicked dish from all arrays
 * 2) save prices & dishes & amount in localstorage
 * 3) render basket
 */
function removeItem(i) {
    addedNames.splice(i, 1);
    addedPrices.splice(i, 1);
    addedAmount.splice(i, 1);
    saveBasket();
    renderBasket();
}


/**
 * 1) Increase the amount of the clicked dish by 1
 * 2) Save it in localstorage
 * 3) render basket
 */
function add1(i) {
    console.log('add1 läuft');
    addedAmount[i] += 1;
    addedPrices[i] = (addedPrices[i] / (addedAmount[i] - 1)) * addedAmount[i];
    saveBasket();
    renderBasket();
}


/**
 * 1) Decrease the amount of the clicked dish by 1
 * 2) Save it in localstorage
 * 3) render basket
 * 4) Check if amount is 1, if yes remove dish from arrays
 */
function remove1(i) {
    console.log('remove1 läuft');
    if (addedAmount[i] > 1) {
        addedAmount[i] -= 1;
        addedPrices[i] = (addedPrices[i] / (addedAmount[i] + 1)) * addedAmount[i];
        saveBasket();
        renderBasket();
    } else {
        removeItem(i);
        renderBasket();
    }
}


/**
 * 1) Set total-sum to 0
 * 2) Calculate total-sum of all dishes
 * 3) generate the Sum in innerHTML
 */
function calcTotalSum() {
    let calculatedTotalSum = 0;
    for (let i = 0; i < addedPrices.length; i++) {
        calculatedTotalSum = calculatedTotalSum + addedPrices[i];
    }
    document.getElementById('totalSum').innerHTML = `
    <b>${calculatedTotalSum.toFixed(2)} €</b>
    `;
}

function showMenu() {
    document.getElementById('clickMenu').classList.add('show-overlay-menu');
}

function closeMenu() {
    document.getElementById('clickMenu').classList.remove('show-overlay-menu');
}