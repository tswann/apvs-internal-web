const config = require('../../../knexfile').intweb
const knex = require('knex')(config)

module.exports = function (claimId, claimDeduction) {
  return getClaim(claimId)
    .then(function (claim) {
      return knex('IntSchema.ClaimDeduction')
        .returning('ClaimDeductionId')
        .insert({
          EligibilityId: claim.EligibilityId,
          Reference: claim.Reference,
          ClaimId: claimId,
          Amount: claimDeduction.amount,
          DeductionType: claimDeduction.deductionType,
          IsEnabled: true
        })
    })
}

function getClaim (claimId) {
  return knex('IntSchema.Claim')
    .where('ClaimId', claimId)
    .first()
}
