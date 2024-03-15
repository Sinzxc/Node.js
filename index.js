const CC = require('currency-converter-lt')
const http = require('http')
const express = require('express')

const app = express()
app.get('/', (req, res) => {
    res.send('Home Page!')
})

app.get('/user/:user/:id', (req, res) => {
    res.send('user: ' + req.params.user+" ID: " + req.params.id)
})


app.get('/convert/:from/:to/:amount', (req, res) => {

    const amount = parseFloat(req.params.amount);

    let currencyConverter = new CC({from : req.params.from, to : req.params.to, amount :amount})
    currencyConverter.convert().then((response) => {
        res.send('from ' + req.params.from + '\n to ' + req.params.to + '\n amount ' + req.params.amount + "\nresponse: " + response)
    })
})


const PORT=3000;
const URL="localhost"
app.listen(PORT, (req, res) => {
    console.log("Server is running on port: " + PORT);
});


