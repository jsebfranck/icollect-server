var Q = require('q');
var hbase = require('hbase');
var uuid = require('node-uuid');


exports.createCollect = function(p) {
	var defer=Q.defer();
	var id = uuid.v1();
	var row = hbase().getRow("collect", id);
	
	row.put(
				['facts:firstname', 'facts:lastname'], //'facts:phone', 'facts:email', 'facts:sex', 'facts:date', 'facts:localization'],
				[p.firstname, p.lastname],//, p.phone, p.email, p.sex, p.date,  p.localization], 
				function(err, success) {
			        defer.resolve({
			          'params': p,
			          'id': id});
			    });
	
  
  	return defer.promise;  
};
