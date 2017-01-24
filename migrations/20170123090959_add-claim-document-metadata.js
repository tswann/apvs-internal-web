
exports.up = function (knex, Promise) {
  return knex.schema.createTable('ClaimDocumentMetadata', function (table) {
    table.increments('ClaimDocumentMetadataId').unsigned().primary()
    table.integer('ClaimDocumentId').unsigned().notNullable().references('ClaimDocument.ClaimDocumentId')
    table.boolean('IsText')
    table.string('Description')
    table.string('MatchingExpenseLine')
    table.decimal('Confidence')
  })
  .catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('ClaimDocumentMetadata')
  .catch(function (error) {
    console.log(error)
    throw error
  })
}
