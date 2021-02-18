const bcp47 = require('../bcp47.json')

console.log(bcp47.availableLocales.modern[0]);

let query = "INSERT INTO locale (name) VALUES"

let first = true;

for (let code of bcp47.availableLocales.modern){
    if (first){
        query += ` ('${code}')`
        first = false;
        continue;
    }
    query += `, (\'${code}\')`
}

console.log(query)