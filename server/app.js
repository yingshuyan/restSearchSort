const path = require('path')
const express = require("express")
const app = express()


app.use(express.json())
app.use("/api",require('./api'))
app.get("/",(req,res)=>res.sendFile(path.join(__dirname, '..', 'public/index.html')))
app.use(express.static(path.join(__dirname, '..', 'public')))

module.exports = app


