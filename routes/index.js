var express = require('express'),
  router = express.Router(),
  service = require('../services/collect.service');

router.post('/collect', function(req, res) {
  service.createCollect(req.body).then(function(result) {
    res.json(result);
  });
});

module.exports = router;
