const CC = require('currency-converter-lt')
const http = require('http')


let currencyConverter = new CC({from:"USD", to:"RUB", amount:100})
const server=http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    currencyConverter.convert().then((response) => {
        res.end(response.toString());
    })
})

const PORT=3000;
const URL="localhost"
server.listen(PORT,URL, function () {
    console.log("listening on   " +URL+":"+PORT);
})



