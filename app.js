// app.js
require("dotenv").config();
const express = require("express");
const app = express();
const musicRouter = require("./routes/musicRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", musicRouter);
app.use(express.static(__dirname + '/public'));


const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
