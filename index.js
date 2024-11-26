    // Recommended: All functions declared here
// Funktion för att jämföra två stadnamn utan att ta hänsyn till storlek på bokstäver
function isSameName(name1, name2) {
    // Konverterar båda namnen till små bokstäver och jämför dem
    return name1.toLowerCase() === name2.toLowerCase();
}

// Funktion som söker en stad i en lista med städer och returnerar stadens objekt
function getTargetCityObject(cityName) {
    // Går igenom alla städer
    for (let city of cities) {
        // Om stadens namn matchar med det angivna namnet
        if (isSameName(cityName, city.name)) {
            return city; // Returnerar stadens objekt
        }
    }
    // Om staden inte hittas, visa ett felmeddelande på sidan
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${cityName} finns inte i databasen`;
    document.querySelector("title").innerHTML = `Not found`
    document.querySelector("h3").textContent = "";
    return null; // Returnerar null om staden inte hittas
}

// Funktion som hittar den närmaste och längst bort liggande staden från den valda staden
function findClosestFurthest(targetCityObject) {
    if (targetCityObject === null) {
        return null; // Om ingen stad valts, returnera null
    }

    // Sätter upp variabler för att hålla reda på den närmaste och längst bort staden
    let targetID = targetCityObject.id;
    let closestCityID = null;
    let closestValue = 1000000; // Ett stort tal för att hitta den närmaste
    let furthestCityID = null;
    let furthestValue = 0; // Ett litet tal för att hitta den längst bort

    // Går igenom alla avstånd mellan städer
    for (let distance of distances) {
        // Om den valda staden är en del av avståndet
        if (targetID === distance.city1 || targetID === distance.city2) {
            // Hitta den närmaste staden
            if (distance.distance < closestValue) {
                if (targetID === distance.city1) {
                    closestCityID = distance.city2;
                    closestValue = distance.distance;
                } else {
                    closestCityID = distance.city1;
                    closestValue = distance.distance;
                }
            }
            // Hitta den längst bort staden
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

    // Returnerar id och avstånd för den närmaste och längst bort staden
    return [closestCityID, closestValue, furthestCityID, furthestValue];
}


function createAllCityBoxes(cityName) {
    // Hämta elementet där städerna ska visas
    for (let city of cities) {
        const cityBox = document.createElement("div");
        document.querySelector("#cities").appendChild(cityBox);
        cityBox.setAttribute("class", "cityBox"); // Sätt klass för stadens ruta
        cityBox.innerHTML = city.name; // Visa stadens namn i rutan

        // Om staden är den valda staden, markera den som "target"
        if (closestFurthest === null) {
            continue;
        }
        if (isSameName(cityName, city.name)) {
            cityBox.setAttribute("class", "target cityBox");
            document.querySelector("h2").innerHTML = `${city.name} (${city.country})`;
            document.querySelector("title").innerHTML = city.name;
        }

        // Om staden är den närmaste, markera den och visa avståndet
        if (closestFurthest[0] === city.id) {
            cityBox.setAttribute("class", "closest cityBox");
            cityBox.innerHTML = `${city.name} ligger ${closestFurthest[1] / 10} mil bort`;
            document.querySelector("#closest").innerHTML = city.name;
        }

        // Om staden är den längst bort, markera den och visa avståndet
        if (closestFurthest[2] === city.id) {
            cityBox.setAttribute("class", "furthest cityBox");
            cityBox.innerHTML = `${city.name} ligger ${closestFurthest[3] / 10} mil bort`;
            document.querySelector("#furthest").innerHTML = city.name;
        }
    }
}


function createTable() {
    // Hämta tabellen där städerna och avstånden ska visas
    const table = document.querySelector("#table");
    table.style.width = "100%"; // Sätt tabellens bredd

    const rows = cities.length; // Antal rader baserat på antalet städer
    const columns = cities.length + 1; // Antal kolumner (en extra för att visa städer)

    // Skapa rubrikrad med städer som kolumnrubriker
    for (let column = 0; column < columns; column++) {
        const blankCell = document.createElement("div");
        blankCell.setAttribute("class", "cell head_column");

        // Om det är första kolumnen, sätt den tom
        if (column === 0) {
            blankCell.textContent = "";
        } else {
            blankCell.textContent = cities[column - 1].id; // Visa stadens id
        }

        table.appendChild(blankCell); // Lägg till cellen i tabellen
    }

    // Skapa en rad för varje stad
    for (let row = 0; row < rows; row++) {
        let namesRow = document.createElement("div");
        namesRow.innerHTML = `${cities[row].id}-${cities[row].name}`; // Visa stadens id och namn
        namesRow.setAttribute("class", "head_row cell");

        // Om raden är jämn, ge den en särskild stil
        if ((row) % 2 === 0) {
            namesRow.setAttribute("class", "cell head_row even_row");
        }
        table.appendChild(namesRow); // Lägg till stadens rad i tabellen

        // Skapa en cell för varje stad och visa avståndet till den
        for (let column = 0; column < cities.length; column++) {
            const cell = document.createElement("div");
            cell.setAttribute("class", "cell");

            let distanceValue = null;
            // Hitta avståndet mellan den aktuella staden (row) och alla andra städer (column)
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

            // Om avståndet finns, visa det i cellen
            if (distanceValue !== null) {
                cell.innerHTML = `${distanceValue / 10}`; // Dela med 10 för att konvertera till mil
            }

            // Ge varannan rad och varannan kolumn en bakgrundsfärg för bättre läsbarhet
            if (column % 2 === 0) {
                cell.style.backgroundColor = "BurlyWood";
            }
            if ((row) % 2 === 0) {
                cell.setAttribute("class", "cell even_row");
            }

            table.appendChild(cell); // Lägg till cellen i tabellen
        }
    }
}
//------






      

