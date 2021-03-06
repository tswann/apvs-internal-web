const expect = require('chai').expect
const validator = require('../../../../app/services/validators/common-validator')

describe('services/validators/common-validator', function () {
  const ALPHA_STRING = 'apvs'
  const NUMERIC_STRING = '123'
  const ALPHANUMERIC_STRING = 'apvs123'
  const DECIMAL_STRING = '0.1'

  describe('isNullOrUndefined', function () {
    it('should return true if passed null', function (done) {
      var result = validator.isNullOrUndefined(null)
      expect(result).to.equal(true)
      done()
    })

    it('should return true if passed undefined', function (done) {
      var result = validator.isNullOrUndefined(undefined)
      expect(result).to.equal(true)
      done()
    })

    it('should return true if passed an empty string', function (done) {
      var result = validator.isNullOrUndefined('')
      expect(result).to.equal(true)
      done()
    })

    it('should return false if passed an object', function (done) {
      var result = validator.isNullOrUndefined({})
      expect(result).to.equal(false)
      done()
    })

    it('should return false if passed an array', function (done) {
      var result = validator.isNullOrUndefined([])
      expect(result).to.equal(false)
      done()
    })

    it('should return false if passed a non empty string', function (done) {
      var result = validator.isNullOrUndefined('any string')
      expect(result).to.equal(false)
      done()
    })
  })

  describe('isNumeric', function () {
    it('should throw an error if passed null', function (done) {
      expect(function () {
        validator.isNumeric(null)
      }).to.throw(TypeError)
      done()
    })

    it('should throw an error if passed undefined', function (done) {
      expect(function () {
        validator.isNumeric(undefined)
      }).to.throw(TypeError)
      done()
    })

    it('should throw an error if passed an object', function (done) {
      expect(function () {
        validator.isNumeric({})
      }).to.throw(TypeError)
      done()
    })

    it('should return false if passed an alpha string', function (done) {
      var result = validator.isNumeric(ALPHA_STRING)
      expect(result).to.equal(false)
      done()
    })

    it('should return false if passed an alphanumeric string', function (done) {
      var result = validator.isNumeric(ALPHANUMERIC_STRING)
      expect(result).to.equal(false)
      done()
    })

    it('should return true if passed a numeric string', function (done) {
      var result = validator.isNumeric(NUMERIC_STRING)
      expect(result).to.equal(true)
      done()
    })

    it('should return true if passed a decimal string', function (done) {
      var result = validator.isNumeric(DECIMAL_STRING)
      expect(result).to.equal(true)
      done()
    })
  })

  describe('isCurrency', function () {
    const VALID_INTEGER = '20'
    const VALID_DECIMAL = '20.00'
    const INVALID_STRING = 'invalid'

    it('should throw an error if passed null', function (done) {
      expect(function () {
        validator.isCurrency(null)
      }).to.throw(TypeError)
      done()
    })

    it('should throw an error if passed undefined', function (done) {
      expect(function () {
        validator.isCurrency(undefined)
      }).to.throw(TypeError)
      done()
    })

    it('should throw an error if passed an object', function (done) {
      expect(function () {
        validator.isCurrency({})
      }).to.throw(TypeError)
      done()
    })

    it('should return true if passed a numeric string', function (done) {
      var result = validator.isCurrency(VALID_INTEGER)
      expect(result).to.equal(true)
      done()
    })

    it('should return true if passed a numeric string to 2 decimal places', function (done) {
      var result = validator.isCurrency(VALID_DECIMAL)
      expect(result).to.equal(true)
      done()
    })

    it('should return false if passed a non-numeric string', function (done) {
      var result = validator.isCurrency(INVALID_STRING)
      expect(result).to.equal(false)
      done()
    })
  })

  describe('isGreaterThanZero', function () {
    const VALID_NUMERIC = '20'
    const VALID_FLOAT = '7.99'
    const INVALID_NUMERIC = '-20'
    const INVALID_STRING = 'some invalid string'

    it('should return false if passed null', function (done) {
      var result = validator.isGreaterThanZero(null)
      expect(result).to.equal(false)
      done()
    })

    it('should return false if passed undefined', function (done) {
      var result = validator.isGreaterThanZero(undefined)
      expect(result).to.equal(false)
      done()
    })

    it('should return false if passed an object', function (done) {
      var result = validator.isGreaterThanZero({})
      expect(result).to.equal(false)
      done()
    })

    it('should return true if passed a numeric string that is greater than zero', function (done) {
      var result = validator.isGreaterThanZero(VALID_NUMERIC)
      expect(result).to.equal(true)
      done()
    })

    it('should return true if passed a float that is greater than zero', function (done) {
      var result = validator.isGreaterThanZero(VALID_FLOAT)
      expect(result).to.equal(true)
      done()
    })

    it('should return false if passed a negative numeric string', function (done) {
      var result = validator.isGreaterThanZero(INVALID_NUMERIC)
      expect(result).to.equal(false)
      done()
    })

    it('should return false if passed a non-numeric string', function (done) {
      var result = validator.isGreaterThanZero(INVALID_STRING)
      expect(result).to.equal(false)
      done()
    })
  })

  describe('isLessThanMaximumDifferentApprovedAmount', function () {
    const VALID_NUMERIC = '20'
    const VALID_FLOAT = '7.99'
    const INVALID_NUMERIC = '1000'
    const INVALID_STRING = 'some invalid string'

    it('should return false if passed null', function (done) {
      var result = validator.isLessThanMaximumDifferentApprovedAmount(null)
      expect(result).to.equal(false)
      done()
    })

    it('should return false if passed undefined', function (done) {
      var result = validator.isLessThanMaximumDifferentApprovedAmount(undefined)
      expect(result).to.equal(false)
      done()
    })

    it('should return false if passed an object', function (done) {
      var result = validator.isLessThanMaximumDifferentApprovedAmount({})
      expect(result).to.equal(false)
      done()
    })

    it('should return true if passed a numeric string that is greater than zero', function (done) {
      var result = validator.isLessThanMaximumDifferentApprovedAmount(VALID_NUMERIC)
      expect(result).to.equal(true)
      done()
    })

    it('should return true if passed a float that is greater than zero', function (done) {
      var result = validator.isLessThanMaximumDifferentApprovedAmount(VALID_FLOAT)
      expect(result).to.equal(true)
      done()
    })

    it('should return false if passed a negative numeric string', function (done) {
      var result = validator.isLessThanMaximumDifferentApprovedAmount(INVALID_NUMERIC)
      expect(result).to.equal(false)
      done()
    })

    it('should return false if passed a non-numeric string', function (done) {
      var result = validator.isLessThanMaximumDifferentApprovedAmount(INVALID_STRING)
      expect(result).to.equal(false)
      done()
    })
  })
})
