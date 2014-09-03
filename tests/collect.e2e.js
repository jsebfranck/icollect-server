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
        expect(res.body.id).to.equal('JKLMQSDFJMLKEZMKL');
        expect(res.body.lastname).to.equal('Collex');
        expect(res.body.firstname).to.equal('Tatiana');
        expect(res.body.role).to.equal('IN_CHARGE');
        done();
       });
  });

  it('should collect data', function(done) {
    request(app)
      .post('/collect')
      .send({})
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        if (err) {
          console.log('ERROR', err);
        }
        done();
       });
  });
});
