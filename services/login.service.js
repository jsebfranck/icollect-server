var Q = require('q');

var collectorsByEmail = {
  ok: {
    password:'ok',
    firstname: 'Tatiana',
    lastname: 'Collex',
    collectorId: 'xxx'
  }
};

var getCollectorByCredentials = function(params) {
  return Q.resolve(collectorsByEmail[params.email]);
};

exports.login = function(params) {
/*  return Q.resolve({
    'params': params,
    'id': 'qlkmsdjfklmqsdfj'
  });
*/
  return Q.resolve({
    id:'JKLMQSDFJMLKEZMKL',
    lastname: 'Collex',
    firstname: 'Tatiana',
    role: 'IN_CHARGE'
  });
};
