const express = require('express');
const https = require('https');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    const type = req.body.type;
    const url = `https://api.sampleapis.com/coffee/${type}`;

    https.get(url, (response) => {
        response.on('data', data => {
            const coffeeData = JSON.parse(data);
            res.render('form', { coffeeData: coffeeData });
        });
    });
});

app.listen(3000, () => {
    console.log('server is running');
});