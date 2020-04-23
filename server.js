const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

if (process.env.NODE_ENV === "production") {
// 	app.use(express.static('client/build'));
	databaseToUse = "mongodb://Project3:Filipo21@ds143604.mlab.com:43604/heroku_n6fbsh2q";
}
else {
	databaseToUse = 'mongodb://localhost';
}

app.use(routes);

const MONGODB_URI = process.env.MONGODB_URI || databaseToUse;


mongoose.Promise = global.Promise;

mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
	console.log(`App running on port ${PORT}`);
});

// mongoose.connect(process.env.ATLAS_URI || "mongodb://Project3:Filipo21@ds143604.mlab.com:43604/heroku_n6fbsh2q");
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });
