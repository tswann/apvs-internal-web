const config = require('../config')

/**
 * Adds a table function to the IntSchema that retrieves all claim documents by reference and claimId and grants the
 * external web user permissions to call it.
 */
exports.seed = function (knex, Promise) {
  return knex.schema
    .raw('DROP FUNCTION IF EXISTS IntSchema.getClaimDocumentsHistoricClaim')
    .then(function () {
      return knex.schema
        .raw(
          `
            CREATE FUNCTION IntSchema.getClaimDocumentsHistoricClaim(@reference varchar(7), @claimId int)
            RETURNS TABLE
            AS
            RETURN
            (
              SELECT
                ClaimDocument.DocumentStatus,
                ClaimDocument.DocumentType,
                ClaimDocument.ClaimExpenseId
              FROM IntSchema.ClaimDocument AS ClaimDocument
              WHERE
                ClaimDocument.Reference = @reference AND
                ClaimDocument.ClaimId = @claimId
            )
          `
        )
        .raw('GRANT SELECT ON IntSchema.getClaimDocumentsHistoricClaim TO ??;', [config.EXT_WEB_USERNAME])
    })
    .catch(function (error) {
      console.log(error)
      throw error
    })
}