// Recommended: All functions declared here

/**skapr div år alla länderna och kopplar den till sin css class */
function createAllCityBoxes (city) {
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("cityBox");
    cityDiv.textContent = city.name;
    return cityDiv;
}

/*går igenom databasen gör att se ifall staden finns eller inte*/
function isCityFound (target) {
    let cityFound = false;
    let chosenCity = null;
    const targetLC = target.toLowerCase ();

    for (let cityValue of cities) {
        const cityValueLC = cityValue.name.toLowerCase ()
        console.log("Innan if funktionen.");

        if (targetLC == cityValueLC) {
            console.log("Inuti if-satsen")
            //Jämför target med indexerad (chosenCity) array i Cities
            cityFound = true;
            h2.textContent = target;
            chosenCity = cityValue;
            console.log(cityFound);
            break;
        } else {
            console.log("Denna stad finns ej");
            console.log(cityFound);
        }
        console.log("Chosen city = '" + chosenCity + "'" );
        console.log("______")

    }
};







/**tabellen*/
function createTable() {
    const table = document.querySelector("#table");
    table.style.width = "100%"

    const rows = cities.length;
    const columns = cities.length + 1;

    for (let a = 0; a < columns; a++) {
        const blankCell = document.createElement("div");
        blankCell.setAttribute("class", "cell head_column");

        if (a === 0) {
            blankCell.textContent = "";
        } else {
            blankCell.textContent = cities[a - 1].id;
        }

        table.appendChild(blankCell);
    }

    for (let i = 0; i < rows; i++) {
        let namesRow = document.createElement("div");
        namesRow.innerHTML = `${cities[i].id}-${cities[i].name}`
        namesRow.setAttribute("class", "head_row cell");

        if ((i + 1) % 2 === 0) {
            namesRow.setAttribute("class", "cell head_row even_row")
        }
        table.appendChild(namesRow);

        for (let j = 0; j < cities.length; j++) {
            const cell = document.createElement("div");
            cell.setAttribute("class", "cell");
            

            let distanceValue = null;
            for (let distance of distances) {
                if (
                    distance.city1 === cities[i].id &&
                    distance.city2 === cities[j].id
                ) {
                    distanceValue = distance.distance;
                    break;
                }
                if (distance.city2 === cities[i].id && distance.city1 === cities[j].id) {
                    distanceValue = distance.distance
                }
            }

            if (distanceValue !== null) {
                cell.innerHTML = `${distanceValue / 10}`;
            }

            if (j % 2 === 0) {
                cell.style.backgroundColor = "BurlyWood"
            }
            if ((i + 1) % 2 === 0) {
                cell.setAttribute("class", "cell even_row")
            }

            table.appendChild(cell);
        }
    }
}
createTable();







// Recommended: constants with references to existing HTML-elements

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const closestCity = document.getElementById("closest");
const furthestCity = document.getElementById("furthest");
const divCities = document.getElementById("cities");

// Recommended: Ask for the city name and then the rest of the code

const target = prompt("Vilken stad?");
console.log (target);

isCityFound(target);

let divCitiesElem = document.getElementById("cities");

for (let city of cities) {
    divCitiesElem.append(createAllCityBoxes(city));
};


