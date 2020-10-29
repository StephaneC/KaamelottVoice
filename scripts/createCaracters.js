/**
 * Waiting input:
 * @param : json filename
 * @param : json key for entities
 */
const fs = require('fs');
const sounds = require('../src/commons/data/data.json');
 
const names = [...new Set(sounds.map(e => e.character))];
let csvContent = names.join(",\n");
fs.writeFileSync('caracters.csv', csvContent);





