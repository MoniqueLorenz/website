function areNamesEqual(name1, name2) {
    return name1.toLowerCase() === name2.toLowerCase(); 
}

function getTargetCityObject(cityName) {
    const city = cities.find(city => areNamesEqual(cityName, city.name)); 
    if (city) {
        return city;
    }
    document.querySelector("h2").innerHTML = `${cityName} finns inte i databasen`;
    document.querySelector("title").innerHTML = "Not found";
    document.querySelector("h3").textContent = "";
    return null; 
}

function findClosestFurthest(targetCityObject) {
    if (!targetCityObject) return null; 

    let closestCity = { id: null, distance: Infinity };
    let furthestCity = { id: null, distance: 0 };

    distances.forEach(distance => {
        if (targetCityObject.id === distance.city1 || targetCityObject.id === distance.city2) {
            const otherCityID = targetCityObject.id === distance.city1 ? distance.city2 : distance.city1;
            const cityDistance = distance.distance;

            if (cityDistance < closestCity.distance) {
                closestCity = { id: otherCityID, distance: cityDistance };
            }

            if (cityDistance > furthestCity.distance) {
                furthestCity = { id: otherCityID, distance: cityDistance };
            }
        }
    });

    return [closestCity.id, closestCity.distance, furthestCity.id, furthestCity.distance];
}

function createAllCityBoxes(cityName) {
    cities.forEach(city => {
        const cityBox = document.createElement("div");
        cityBox.classList.add("cityBox");
        cityBox.textContent = city.name;
        document.querySelector("#cities").appendChild(cityBox);

        if (areNamesEqual(cityName, city.name)) {
            cityBox.classList.add("target");
            document.querySelector("h2").innerHTML = `${city.name} (${city.country})`;
            document.querySelector("title").innerHTML = city.name;
        }

        if (closestFurthest && closestFurthest[0] === city.id) {
            cityBox.classList.add("closest");
            cityBox.textContent = `${city.name} ligger ${closestFurthest[1] / 10} mil bort`;
            document.querySelector("#closest").innerHTML = city.name;
        }

        if (closestFurthest && closestFurthest[2] === city.id) {
            cityBox.classList.add("furthest");
            cityBox.textContent = `${city.name} ligger ${closestFurthest[3] / 10} mil bort`;
            document.querySelector("#furthest").innerHTML = city.name;
        }
    });
}

function createTable() {
    const table = document.querySelector("#table");
    table.style.width = "100%";

    const headerRow = document.createElement("div");
    headerRow.classList.add("cell", "head_column");
    table.appendChild(headerRow);
    cities.forEach(city => {
        const cell = document.createElement("div");
        cell.classList.add("cell", "head_column");
        cell.textContent = city.id;
        table.appendChild(cell);
    });

    cities.forEach((rowCity, rowIndex) => {
        const row = document.createElement("div");
        row.classList.add("cell", "head_row");
        row.textContent = `${rowCity.id}-${rowCity.name}`;
        if (rowIndex % 2 === 0) row.classList.add("even_row");
        table.appendChild(row);

        cities.forEach((columnCity, columnIndex) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            const distance = distances.find(d => 
                (d.city1 === rowCity.id && d.city2 === columnCity.id) || 
                (d.city2 === rowCity.id && d.city1 === columnCity.id)
            );

            if (distance) {
                cell.textContent = `${distance.distance / 10}`;
            }

            if (columnIndex % 2 === 0) cell.style.backgroundColor = "BurlyWood";
            if (rowIndex % 2 === 0) cell.classList.add("even_row");

            table.appendChild(cell);
        });
    });
}

const targetCityName = prompt("Skriv en stad");

const targetCityObject = getTargetCityObject(targetCityName);
const closestFurthest = findClosestFurthest(targetCityObject);

createAllCityBoxes(targetCityName); 
createTable(); 
