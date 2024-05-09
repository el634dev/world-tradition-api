const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../server');
const mongoose = require('mongoose');

const User = require('../models/user');
const Tradition = require('../models/traditions');

chai.config.includeStack = true;

const expect = chai.expect();
const should = chai.should();

chai.use(chaiHttp);

after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close()
  done()
});

// 12 byte strings for testing
const USER_OBJECT_ID = '245698783156';
const SAMPLE_TRADITIONS_ID = 'cccccccccccc';

describe('API Tests', () => {
  beforeEach(async (done) => {
    const sampleTradition = new Tradition({
      tradition: 'Gather around a table to share a meal',
      country: 'United States',
      holiday: 'Thanksgiving'
    })
    await sampleTradition.save()

    const sampleUser = new User({
      username: 'myuser1',
      password: 'mysupersecretpassword',
      _id: USER_OBJECT_ID
    })
    await sampleUser.save()
  })

  afterEach((done) => {
    User.deleteOne({ username: ['myuser1'] })
    Tradition.deleteOne({ holiday:['Christmas', 'Day of the Dead', 'New Years']})
      .then(() => {
        done()
      })
  })

  // Test one tradition
  it('should get one tradition', (done) {
    chai.request(app)
      .get('/traditions')
      .end((error, response) => {
          if(error) done(error);

          expect(response.body).to.be.an('object');
          expect(response.body.traditions[0].holiday).to.deep.equal('Day of the Dead')
          expect(response.body.traditions[0].country).to.deep.equal('United States')
          done();
      })
  });

  // Test get one specific tradition
  it('should get one specific tradition', (done) => {
    chai.request(app)
      .get(`/traditions/${SAMPLE_TRADITIONS_ID}`)
      .end((error, response) => {
          if(error) done(error);

          expect(response.body).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.traditions[0].holiday).to.deep.equal('Day of the Dead')
          expect(response.body.traditions[0].country).to.deep.equal('United States')
         
          // Check to see if the tradition exists
          Tradition.findOne({ tradition: 'Day of the Dead' }).then(tradition => {
            expect(tradition).to.be.an('object');
            done();
          });
       });
    });

    // Testing for a new tradition that was created
    it('should post a new tradition', (done) => {
      const newTradition = {
        tradition: 'decorate',
        country: 'Canada',
        holiday: 'Christmas'
      }

      chai.request(app)
      .post('/traditions')
      .end((error, response) => {
          if(error) done(error);

          expect(response.body).to.be.an('object');
          expect(response.body.traditions[0].holiday).to.be.property('tradition', 'country')
       });
    })

    it('should update a tradition', (done) => {
      chai.request(app)
      .put(`/traditions/${SAMPLE_TRADITION_ID}`)
      .send({ tradition: 'Celebrate with countdown', holiday: 'New Years'})
      .end((error, response) => {
          if(error) done(error);

          expect(response.body).to.be.an('object');
          expect(response.body.traditions[0].holiday).to.be.property('tradition', 'country')
          expect(response.body.traditions[0].holiday).to.be.property('body', 'holiday')

          // Check to see if the tradition exists
          Tradition.findOne({ tradition: 'New Years' }).then(tradition => {
            expect(tradition).to.be.an('object');
            done();
          });
       });

       it('should delete a tradition', (done) => {
        chai.request(app)
          .delete(`/traditions/${SAMPLE_TRADITION_ID}`)
          .end((error, response) => {
            if(error) done(error);

            expect(response.body).to.equal('Tradition was successfully deleted');
            expect(response.body._id).to.equal(SAMPLE_TRADITION_ID);

            // Check deletion
            User.findOne().then(user => {
              expect(user).to.have.property('user_1', 'myuser1')
              expect(user).to.equal(null);
            }).then(() => {
              Tradition.findOne({ tradition:'New Years'}).then(tradition => {
                expect(tradition).to.equal(null);
              }).then(() => {
                done();
              })
            })
          })
       });
    })
});
