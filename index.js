const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const connectDb=require('./connectDB')

const PORT=3000;
const URL="http://localhost"

const app = express( )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

connectDb.connect();

routes.posts(app)


app.listen(PORT, (req, res) => {
    console.log("Server is running on port: " + PORT);
});
