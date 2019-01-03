const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const uri =
  process.env.MONGODB_URI ||
  'mongodb://eddy:eddy1234@ds157223.mlab.com:57223/sandbox1';
mongoose.connect(
  uri,
  { useNewUrlParser: true }
);
mongoose.connection.on('error', err => {
  console.log('Mongoose error:', err);
});
mongoose.connection.once('open', () => {
  console.log('Mongoose connected successfully');
});
