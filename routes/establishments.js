const express = require('express');
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');

const router  = express.Router();

router.get('/', (req, res) => {
  res.render('establishments/establishments');
});

router.get('/new', (req, res) => {
  res.render('establishments/establishmentNew');
});

router.post('/new', (req, res) => {
  res.render('establishments/establishments');
});


module.exports = router;
