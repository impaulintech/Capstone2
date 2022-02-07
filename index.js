//Import Modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const DATABASE_URL = "mongodb+srv://admin:admin@csp2.tpt6x.mongodb.net/database?retryWrites=true&w=majority";

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//userRoutes module
app.use("/api/users", require('./routes/userRoutes'));

//productRoutes module
app.use("/api/products", require('./routes/productRoutes'))

//Connection to database
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

//Database status
const db = mongoose.connection;
db.on('error', console.error.bind(console, `Error connecting to database`));
db.once('open', () => { console.log(`Connected to database`) })

//Server status
app.listen(PORT, () => { console.log(`server is running at ${PORT}`) })