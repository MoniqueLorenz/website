// Recommended: All functions declared here
/*skapar divar för varje stad som appendar i funktionsanrop.*/
function createAllCityBoxes (city) {
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("cityBox");
    cityDiv.textContent = city.name;
    return cityDiv;
}





// Recommended: constants with references to existing HTML-elements
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const divCities = document.getElementById("cities");
const furtherstCities = document.getElementById("furthest");
const closestCity=  document.getElementById("closest");








// Recommended: Ask for the city name and then the rest of the code

let divCitiesElem = document.getElementById("cities");
/*anrop av funktionen "createAllCityBoxes" för att skapa divar för varje stad */
for (let city of cities) {
    divCitiesElem.append(createAllCityBoxes(city));
}
createAllCityBoxes(city);










