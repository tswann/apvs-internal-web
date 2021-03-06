const config = require('../../../config')
/**
 * This file defines all generic validation tests used in the application. This file can and should be used by the
 * three higher level validators: FieldValidator, FieldSetValidator, and UrlPathValidator.
 */
const validator = require('validator')

exports.isNullOrUndefined = function (value) {
  return !value
}

exports.isNumeric = function (value) {
  return validator.isNumeric(value) || validator.isDecimal(value)
}

exports.isCurrency = function (value) {
  return validator.isCurrency(value)
}

exports.isGreaterThanZero = function (value) {
  return value > 0
}

exports.isGreaterThanOrEqualToZero = function (value) {
  return value >= 0
}

exports.isLessThanMaximumDifferentApprovedAmount = function (value) {
  return value <= parseInt(config.MAX_APPROVED_DIFFERENT_AMOUNT) && value !== null
}
