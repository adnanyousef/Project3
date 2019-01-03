const router = require('express').Router();
const { signin, signup } = require('../controllers/auth');

const { authenticate, localSignin } = require('../services/passport');

router.get('/', authenticate, function(req, res) {
  res.send({ hi: 'there' });
});

router.post('/signin', localSignin, signin);

router.post('/signup', signup);

router.get('/', authenticate, (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = router;
