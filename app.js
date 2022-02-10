//Import Modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//Server & Database connection
let port = 5000;
const DATABASE_URL = "mongodb+srv://admin:admin@csp2.tpt6x.mongodb.net/database?retryWrites=true&w=majority";

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Connection to database
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

//Database status
const db = mongoose.connection;
db.on('error', console.error.bind(console, `Error Connecting to Database.`));
db.once('open', () => { console.log(`Connected to Database!`) })

//userRoutes module
app.use("/users", require('./routes/userRoutes'));

//productRoutes module
app.use("/products", require('./routes/productRoutes'))

//Server status
app.listen(process.env.PORT || port, () => { console.log(`Server is running at PORT:${port}`) })