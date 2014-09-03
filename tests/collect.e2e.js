var request = require('supertest'),
  chai = require('chai'),
  expect = chai.expect,
  app = require('../app');

describe('icollect', function() {

  it('should login the collector', function(done) {
    request(app)
      .post('/login')
      .send({})
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        done();
       });
  });

  it('should collect data', function(done) {
    request(app)
      .post('/collect')
      .send({})
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        done();
       });
  });
});
