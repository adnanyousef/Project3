require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to Mongo database
mongoose.Promise = global.Promise;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/project3';
mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on('error', function (err) {
  console.log("-----Mongoose error: -----\n" + err);
});
mongoose.connection.once('open', function () {
  console.log("Mongoose connected successfully");
});


// Sessions
app.use(session({
	secret: process.env.SECRET_PHRASE || "keyboard cat",
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	resave: false,
	saveUninitialized: false
}));

// Passport (configured in ./passport/index.js)
app.use(passport.initialize());
app.use(passport.session()); 

// Only serve static build folder if deployed
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
};

// Routes
const userRoutes = require('./routes/user');
const postRoutes = require("./routes/post");
app.use('/user', userRoutes);
app.use("/api", postRoutes);

// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});


// Start Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`);
});
