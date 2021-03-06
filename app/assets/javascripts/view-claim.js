$('.claim-expense-status').change(function () {
  var id = $(this).attr('data-id')
  var value = $(this).val()
  if (value === 'APPROVED-DIFF-AMOUNT' || value === 'MANUALLY-PROCESSED') {
    $(`#claim-expense-${id}-approvedcost`).removeClass('visibility-hidden').addClass('visibility-visible')
    $(this).next('input').on('input').addClass('approved-amount')
    $(this).parent().parent().find('td.cost').removeClass('approved-amount')
    $('input.approved-amount').on('input', function () {
      totalApproved()
    })
  } else if (value === 'APPROVED') {
    $(`#claim-expense-${id}-approvedcost`).removeClass('visibility-visible').addClass('visibility-hidden')
    $(this).parent().parent().find('td.cost').addClass('approved-amount')
    $(this).next('input').on('input').removeClass('approved-amount')
  } else {
    $(`#claim-expense-${id}-approvedcost`).removeClass('visibility-visible').addClass('visibility-hidden')
    $(this).parent().parent().find('td.cost').removeClass('approved-amount')
    $(this).next('input').on('input').removeClass('approved-amount')
  } totalApproved()
})

$(function () {
  $('.claim-expense-status').next('input').addClass('approved-amount')
  $('input.approved-amount').on('input', function () {
    totalApproved()
  })
})

function totalApproved () {
  var approvedCost = 0
  var manuallyProcessed = 0
  $('input.approved-amount').each(function () {
    if (!isNaN(this.value) && this.value.length !== 0) {
      manuallyProcessed += parseFloat(this.value)
    }
  })

  $('td.approved-amount').each(function () {
    approvedCost += +$(this).text().replace('£', '')
  })

  $('.claim-expense-approvedCostText').text('£' + (approvedCost + manuallyProcessed).toFixed(2))
}
