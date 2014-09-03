var Q = require('q');

var collectorsByEmail = {
  ok: {
    id:'JKLMQSDFJMLKEZMKL',
    lastname: 'Collex',
    firstname: 'Tatiana',
    role: 'IN_CHARGE'
  }
};

exports.login = function(params) {
  return Q.resolve(collectorsByEmail.ok);
};
