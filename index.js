function isSameName(name1, name2) {
    return name1.toLowerCase() === name2.toLowerCase();
}

function getTargetCityObject(cityName) {
    for (let city of cities) {
        if (isSameName(cityName, city.name)) {
            return city;
        }
    }
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${cityName} finns inte i databasen`;
    document.querySelector("title").innerHTML = `Not found`
    document.querySelector("h3").textContent = "";
    return null;
}

function findClosestFurthest(targetCityObject) {
    if (targetCityObject === null) {
        return null;
    }

    let targetID = targetCityObject.id;
    let closestCityID = null;
    let closestValue = 1000000;
    let furthestCityID = null;
    let furthestValue = 0;

    for (let distance of distances) {
        if (targetID === distance.city1 || targetID === distance.city2) {
            if (distance.distance < closestValue) {
                if (targetID === distance.city1) {
                    closestCityID = distance.city2;
                    closestValue = distance.distance;
                } else {
                    closestCityID = distance.city1;
                    closestValue = distance.distance;
                }
            }
            if (distance.distance > furthestValue) {
                if (targetID === distance.city1) {
                    furthestCityID = distance.city2;
                    furthestValue = distance.distance;
                } else {
                    furthestCityID = distance.city1;
                    furthestValue = distance.distance;
                }
            }
        }
    }
    return [closestCityID, closestValue, furthestCityID, furthestValue];
}

function createAllCityBoxes(cityName) {
    for (let city of cities) {
        const cityBox = document.createElement("div");
        document.querySelector("#cities").appendChild(cityBox);
        cityBox.setAttribute("class", "cityBox");
        cityBox.innerHTML = city.name;

        if (closestFurthest === null) {
            continue;
        }
        if (isSameName(cityName, city.name)) {
            cityBox.setAttribute("class", "target cityBox");
            document.querySelector("h2").innerHTML = `${city.name} (${city.country})`;
            document.querySelector("title").innerHTML = city.name;
        }

        if (closestFurthest[0] === city.id) {
            cityBox.setAttribute("class", "closest cityBox");
            cityBox.innerHTML = `${city.name} ligger ${closestFurthest[1] / 10} mil bort`;
            document.querySelector("#closest").innerHTML = city.name;
        }

        if (closestFurthest[2] === city.id) {
            cityBox.setAttribute("class", "furthest cityBox");
            cityBox.innerHTML = `${city.name} ligger ${closestFurthest[3] / 10} mil bort`;
            document.querySelector("#furthest").innerHTML = city.name;
        }
    }
}

function createTable() {
    const table = document.querySelector("#table");
    table.style.width = "100%";

    const rows = cities.length;
    const columns = cities.length + 1;

    for (let column = 0; column < columns; column++) {
        const blankCell = document.createElement("div");
        blankCell.setAttribute("class", "cell head_column");
        if (column === 0) {
            blankCell.textContent = "";
        } else {
            blankCell.textContent = cities[column - 1].id;
        }
        table.appendChild(blankCell);
    }

    for (let row = 0; row < rows; row++) {
        let namesRow = document.createElement("div");
        namesRow.innerHTML = `${cities[row].id}-${cities[row].name}`;
        namesRow.setAttribute("class", "head_row cell");
        if ((row) % 2 === 0) {
            namesRow.setAttribute("class", "cell head_row even_row");
        }
        table.appendChild(namesRow);

        for (let column = 0; column < cities.length; column++) {
            const cell = document.createElement("div");
            cell.setAttribute("class", "cell");

            let distanceValue = null;
            for (let distance of distances) {
                if (
                    distance.city1 === cities[row].id &&
                    distance.city2 === cities[column].id
                ) {
                    distanceValue = distance.distance;
                    break;
                }
                if (distance.city2 === cities[row].id && distance.city1 === cities[column].id) {
                    distanceValue = distance.distance;
                }
            }
            if (distanceValue !== null) {
                cell.innerHTML = `${distanceValue / 10}`;
            }
            if (column % 2 === 0) {
                cell.style.backgroundColor = "BurlyWood";
            }
            if ((row) % 2 === 0) {
                cell.setAttribute("class", "cell even_row");
            }
            table.appendChild(cell);
        }
    }
}


const citiesDiv = document.querySelector("#cities");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const closestCity = document.querySelector("#closest");
const furthestCity = document.querySelector("#furthest");
const table = document.querySelector("#table");
const tabName = document.head.querySelector("title");


const targetCityName = prompt("Skriv en stad");

let targetCityObject = getTargetCityObject(targetCityName);
let closestFurthest = findClosestFurthest(targetCityObject);
createAllCityBoxes(targetCityName);
createTable();

