const env = require('dotenv');

switch (process.env.NODE_ENV) {
  case 'development':
    env.config({ path: './.env.development' });
    break;
  case 'production':
    env.config({ path: './.env.production' });
    break;
  default:
    env.config();
    break;
}

const app = require('./server');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
