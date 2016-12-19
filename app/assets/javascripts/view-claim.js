$('.claim-expense-status').change(function () {
  var id = $(this).attr('data-id')
  var value = $(this).val()
  if (value === 'APPROVED-DIFF-AMOUNT' || value === 'MANUALLY-PROCESSED') {
    show(`#claim-expense-${id}-approvedcost`)
  } else {
    hide(`#claim-expense-${id}-approvedcost`)
  }
})

$('#add-deduction').click(function () {
  var claimId = getCurrentClaimId()
  var postUrl = '/claim/' + claimId + '/add-deduction'
  var data = {
    'deductionAmount': $('#deductionAmount').val(),
    'deductionType': $('#deductionType').find(':selected').val()
  }

  postRequest(postUrl, data, '/claim/' + claimId)
})

$('#remove-deduction').click(function (event) {
  var claimId = getCurrentClaimId()
  var buttonName = event.target.name
  var deductionId = buttonName.substring(buttonName.lastIndexOf('-') + 1)
  var postUrl = '/claim/' + claimId + '/remove-deduction'
  var data = {
    'deductionId': deductionId
  }

  postRequest(postUrl, data, '/claim/' + claimId)
})

$('#update-overpayment-status').click(function (event) {
  var claimId = getCurrentClaimId()
  var postUrl = '/claim/' + claimId + '/overpayment'
  var data = {
    'overpayment-amount': $('#overpayment-amount').val(),
    'overpayment-remaining': $('#overpayment-remaining').val(),
    'overpayment-reason': $('#overpayment-reason').val()
  }

  postRequest(postUrl, data, '/claim/' + claimId)
})

$('#close-advance-claim').click(function (event) {
  var claimId = getCurrentClaimId()
  var postUrl = '/claim/' + claimId + '/close-advance-claim'
  var data = {
    'close-advance-claim-reason': $('#close-advance-claim-reason').val()
  }

  postRequest(postUrl, data, '/')
})

function postRequest (url, data, redirectUrl) {
  data['_csrf'] = $('input[name=\'_csrf\']').val()

  $.ajax({
    url: url,
    type: 'POST',
    data: data,
    success: function () {
      window.location.replace(redirectUrl)
    },
    error: function (jqXHR, textStatus, error) {
      // Todo
    }
  })
}

function getCurrentClaimId () {
  var currentUrl = window.location.pathname
  return currentUrl.split('/')[2]
}

function hide (element) {
  $(element).hide()
}

function show (element) {
  $(element).show()
}
