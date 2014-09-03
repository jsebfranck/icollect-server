var Q = require('q');
var hbase = require('hbase');


exports.createCollect = function(params) {
	var defer=Q.defer();

	hbase({ host: '127.0.0.1', port: 2181 }).put('my_column_family:my_column', 'my value', function(err, success) {
	        	console.log("value was put");
		        defer.resolve({
		          'params': params,
		          'id': 'qlkmsdjfklmqsdfj'
		        });
	    });
  
  return defer.promise;  
};
