var express = require('express');
var router = express.Router();

router.post('/collect', function(req, res) {
  res.json({
    'collectId': '1234IJEIOJHFEL'
  });
});

module.exports = router;
