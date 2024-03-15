const CC = require('currency-converter-lt')
const http = require('http')
const express = require('express')
const {MongoClient} = require('mongodb')
const { connect } = require('http2')

const client=new MongoClient("mongodb://localhost:27017")
const dbName = 'educateDB'; 
const collectionName = 'Users';



const app = express()
app.get('/', (req, res) => {
    res.send('Home Page!')
})


app.get('/user/:user/:id', async (req, res) => {
    res.send('user: ' + req.params.user+" ID: " + req.params.id)
    await connectToDB();
    await addUser(req.params.user, req.params.id);
    await disconnectDB();
});



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

async function connectToDB() {
    try {
        // Подключение к MongoDB
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error:', err);
    } 
}
async function disconnectDB(){
    await client.close();
    console.log('Disconnected from MongoDB');
}

async function addUser(name, age) {
    // Выбор базы данных
    const db = client.db(dbName);

    // Выбор коллекции (она будет создана, если не существует)
    const collection = db.collection(collectionName);

    // Вставка документа в коллекцию
    const document = { name: name, age: age };
    const result = await collection.insertOne(document);
    console.log('Document inserted:', document.name," ", document.age);
}
