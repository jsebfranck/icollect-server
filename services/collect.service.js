var Q = require('q');
var HBase = require('hbase-client');
var uuid = require('node-uuid');
var assert = require('assert');
var filters = require('hbase-client').filters;
var Scan = require('hbase-client').Scan;


exports.createCollect = function(p) {
	var defer=Q.defer();
	var id = uuid.v1();
	
	var client = HBase.create({'zookeeperHosts': [
	    '127.0.0.1:2181'
	  ],
	  'zookeeperRoot': "/hbase-unsecure"
	});
	
	client.putRow('collect', id, {'facts:firstname': p.firstname, 'facts:lastname': p.lastname}, function (err) {
		defer.resolve({
		  'params': p,
		  'id': id});
	});
	
	return defer.promise;  
};

exports.listCollects = function() {
	var defer=Q.defer();
	
	var filterList = new filters.FilterList(filters.FilterList.Operator.MUST_PASS_ALL);
	
	filterList.addFilter(new filters.FirstKeyOnlyFilter());
	filterList.addFilter(new filters.KeyOnlyFilter());
	
	var scan = new Scan('scanner-row0');
	
	scan.setFilter(filterList);
	
	console.log(scan);
	var client = HBase.create({'zookeeperHosts': [
	    '127.0.0.1:2181'
	  ],
	  'zookeeperRoot': "/hbase-unsecure"
	});
	
	client.getScanner('collect', scan, function (err, scanner) {
	  var index = 0;
	  
	  var next = function (numberOfRows) {
	    scanner.next(numberOfRows, function (err, rows) {
	      // console.log(rows)
	      if (rows.length === 0) {
	        return scanner.close(done);
	      }
	
	      var closed = false;
	      rows.forEach(function (row) {
	        var kvs = row.raw();
	        var r = {};
	        for (var i = 0; i < kvs.length; i++) {
	          var kv = kvs[i];

	          console.log(kv.getRow().toString(), kv.toString())
	        }
	      });
	
	      if (closed) {
	        return scanner.close(done);
	      }
	
	      next(numberOfRows);
	    });
	  };
	
	  next(1);
	});
	
		
	return Q.resolve([]);
}