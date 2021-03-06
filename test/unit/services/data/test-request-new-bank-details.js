const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')
const tasksEnum = require('../../../../app/constants/tasks-enum')

var insertTaskSendClaimNotificationStub = sinon.stub().resolves()
var insertClaimEventStub = sinon.stub().resolves()
var updateClaimStatusRequestingBankDetailsStub = sinon.stub().resolves()

var requestNewBankDetails = proxyquire('../../../../app/services/data/request-new-bank-details', {
  './insert-task-send-claim-notification': insertTaskSendClaimNotificationStub,
  './insert-claim-event': insertClaimEventStub,
  './update-claim-status-requesting-bank-details': updateClaimStatusRequestingBankDetailsStub
})

describe('services/data/request-new-bank-details', function () {
  it('should call all of the relevant functions', function () {
    var reference = 'NEWBANK'
    var eligibilityId = 1
    var claimId = 1
    var additionalInformaiton = 'additionalInformaiton'
    var user = 'user'
    return requestNewBankDetails(reference, eligibilityId, claimId, additionalInformaiton, user)
      .then(function (result) {
        expect(updateClaimStatusRequestingBankDetailsStub.calledWith(reference, claimId)).to.be.true
        expect(insertClaimEventStub.calledWith(reference, eligibilityId, claimId, 'REQUEST-NEW-BANK-DETAILS', additionalInformaiton, '', user, false)).to.be.true
        expect(insertTaskSendClaimNotificationStub.calledWith(tasksEnum.REQUEST_INFORMATION_CLAIM_NOTIFICATION, reference, eligibilityId, claimId)).to.be.true
      })
  })
})
