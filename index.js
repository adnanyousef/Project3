const env = require('dotenv');

switch (process.env.NODE_ENV) {
  case 'development':
    env.config({ path: './.env.development' });
    break;
  case 'production':
  default:
    env.config({ path: './.env.production' });
}

const app = require('./server');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
