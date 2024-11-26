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

//------






      

