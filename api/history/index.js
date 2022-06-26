const express = require('express') 

const router = express.Router() 

router.get('/list', require('./history').list)
router.post('/upload', require('./history').upload)

module.exports = router