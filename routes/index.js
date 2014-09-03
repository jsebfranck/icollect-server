var express = require('express'),
  router = express.Router(),
  collectService = require('../services/collect.service'),
  loginService = require('../services/login.service');

router.post('/login', function(req, res) {
  loginService.login(req.body).then(function(result) {
    res.json(result);
  });
});

router.post('/collect', function(req, res) {
  res.json({
    status: 'ok'
  });
});

router.get('/collect', function(req, res) {
  var data = require('./collect.data').getCollectData();
  res.json(data);
});

router.post('/collect-backend', function(req, res) {
  collectService.createCollect(req.body).then(function(result) {
    res.json(result);
  });
});

router.get('/collect-backend', function(req, res) {
  collectService.listCollects().then(function(result) {
    res.json(result);
  });
});

module.exports = router;
