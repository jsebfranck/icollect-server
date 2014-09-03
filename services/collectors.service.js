
var collectorsByEmail = {
  'ok': {
    password:'ok',
    firstname: 'Tatiana',
    lastname: 'Collex',
    collectorId: 'xxx'
  }
};

exports.getCollectorByCredentials = function(params) {
  return Q.resolve(collectorsByEmail[params.email]);
};
