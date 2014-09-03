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
  collectService.createCollect(req.body).then(function(result) {
    res.json(result);
  });
});

module.exports = router;
