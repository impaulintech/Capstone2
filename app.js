//Import Modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//Server & Database connection
let port = process.env.PORT || 5000;
const DATABASE_URL = "mongodb+srv://admin:admin@csp2.tpt6x.mongodb.net/database?retryWrites=true&w=majority";

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Temporary Index Page
app.use("/", require('./routes/index'));

//userRoutes module
app.use("/users", require('./routes/userRoutes'));

//productRoutes module
app.use("/products", require('./routes/productRoutes'))

//Connection to database
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

//Database status
const db = mongoose.connection;
db.on('error', console.error.bind(console, `Error Connecting to Database.`));
db.once('open', () => { console.log(`Connected to Database!`) })

//Server status
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
}
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.listen(port, () => { console.log(`Server is running at PORT:${port}`) })