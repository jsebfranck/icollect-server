var express = require('express'),
  router = express.Router(),
  collectService = require('../services/collect.service'),
  loginService = require('../services/login.service');

router.post('/login', function(req, res) {
  res.json({
    id:'JKLMQSDFJMLKEZMKL',
    lastname: 'Collex',
    firstname: 'Tatiana',
    role: 'IN_CHARGE'
  });
});

router.post('/collect', function(req, res) {
  res.json({
    status: 'ok';
  });
});

router.post('/login-backend', function(req, res) {
  loginService.login(req.body).then(function(result) {
    res.json(result);
  });
});

router.post('/collect-backend', function(req, res) {
  collectService.createCollect(req.body).then(function(result) {
    res.json(result);
  });
});

module.exports = router;
