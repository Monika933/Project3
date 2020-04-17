const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var databaseToUse = ""

if (process.env.NODE_ENV === "production") {
	app.use(express.static('client/build'));
	databaseToUse = "mongodb://project3:Filipo21@ds137488.mlab.com:37488/heroku_99hlg18r";
}
else {
	databaseToUse = 'mongodb://localhost/reactBoilerplate';
}


const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
