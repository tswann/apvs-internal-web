var supertest = require('supertest')
var expect = require('chai').expect
var proxyquire = require('proxyquire')
var express = require('express')
var mockViewEngine = require('./mock-view-engine')
const sinon = require('sinon')
require('sinon-bluebird')
var getClaimsListAndCount

var log = {
  info: function (text) {}
}

describe('routes/index', function () {
  var request
  getClaimsListAndCount = sinon.stub()

  beforeEach(function (done) {
    var route = proxyquire('../../../app/routes/index', {
      '../services/log': log,
      '../services/data/get-claim-list-and-count': getClaimsListAndCount
    })

    var app = express()
    mockViewEngine(app, '../../../app/views')
    route(app)
    request = supertest(app)
    done()
  })

  describe('GET /', function () {
    it('should respond with a 200', function (done) {
      request
        .get('/')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.be.null
          done()
        })
    })
  })

  describe('GET /claims/:status', function () {
    it('should respond with a 200', function (done) {
      getClaimsListAndCount.resolves({claims: [], total: {Count: 0}})
      request
        .get('/claims/TEST?draw=1&start=0&length=10')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.be.null
          expect(getClaimsListAndCount.calledWith('TEST', 0, 10)).to.be.true
          expect(response.recordTotal, 0)
          done()
        })
    })
  })
})
