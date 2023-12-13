const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();

// Generate random users from API
async function getRandomUser() {
    const response = await fetch(`https://randomuser.me/api`);
    const data = await response.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser)
}

// Double money Function
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    })

    updateDOM()
}

// Sort by richest Function
function sortRichest() {
    data.sort((a, b) => b.money - a.money)

    updateDOM()
}

// Show Only Millionaires Function
function showOnlyMillionaires() {
    data = data.filter(item => item.money > 1000000);

    updateDOM()
}

// Entire Wealth Function
function entireWealth() {
    const wealth = data.reduce((accumulator, currentValue) => accumulator + currentValue.money , 0)
    
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <span>${format(wealth)}</span></h3>`;

    main.appendChild(wealthElement);
}

// Add new OBJ to data array
function addData(obj) {
    data.push(obj)

    updateDOM()
}

// Update DOM
function updateDOM(providedData = data) {
    
    main.innerHTML = `<h2>Person <span>Wealth</span></h2>`;
    
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `${item.name} <span>$${format(item.money)}</span>`;

        main.appendChild(element);
    });
}

// Format numbers
function format(number) {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortRichest);
showMillionairesBtn.addEventListener('click', showOnlyMillionaires);
calculateWealthBtn.addEventListener('click', entireWealth);