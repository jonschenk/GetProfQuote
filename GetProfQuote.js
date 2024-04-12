const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Read the files and store the quotes
let quotes = {};
['walker', 'snider', 'wilson'].forEach(professor => {
    quotes[professor] = fs.readFileSync(`${professor}.txt`, 'utf-8').split('\n');
});

app.get('/quote', (req, res) => {
    let professor = req.query.professor;
    let quote;
    if (professor && quotes[professor]) {
        quote = quotes[professor][Math.floor(Math.random() * quotes[professor].length)];
    } else {
        const professors = Object.keys(quotes);
        professor = professors[Math.floor(Math.random() * professors.length)];
        quote = quotes[professor][Math.floor(Math.random() * quotes[professor].length)];
    }
    res.send(quote);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});