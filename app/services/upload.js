const config = require('../../config')
var multer = require('multer')
var crypto = require('crypto')
var path = require('path')
var UploadError = require('./errors/upload-error')
var csrfProtection = require('csurf')({ cookie: true })

const maxFileSize = parseInt(config.FILE_UPLOAD_MAXSIZE)
const allowedFileTypes = [ 'image/png', 'image/jpeg', 'application/pdf' ]

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.query.document !== 'VISIT_CONFIRMATION' && req.query.document !== 'RECEIPT') {
      cb(null, `${config.FILE_UPLOAD_LOCATION}/${req.params.referenceId}-${req.query.eligibilityId}${req.params.documentType}`)
    } else if (req.query.claimExpenseId) {
      cb(null, `${config.FILE_UPLOAD_LOCATION}/${req.params.referenceId}-${req.query.eligibilityId}/${req.params.claimId}/${req.query.claimExpenseId}/${req.params.documentType}`)
    } else {
      cb(null, `${config.FILE_UPLOAD_LOCATION}/${req.params.referenceId}-${req.query.eligibilityId}/${req.params.claimId}/${req.params.documentType}`)
    }
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
      if (err) {
        throw new Error('Problem creating filename')
      }
    })
  }
})

function fileFilter (req, file, cb) {
  csrfProtection(req, file, function (csrfError) {
    if (csrfError) {
      req.error = csrfError
      return cb(null, false, csrfError)
    }
    if (!allowedFileTypes.includes(file.mimetype)) {
      var error = new UploadError('File type error')
      req.error = error
      return cb(null, false, error)
    }
    cb(null, true)
  })
}

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: maxFileSize
  },
  fileFilter: fileFilter
}).single('document')
