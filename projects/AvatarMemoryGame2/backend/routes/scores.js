const express = require('express')
const router = express.Router()
const { getScores, createScore} = require('../controllers/scores')
const filter = require('../middleware/filter')

router.route('/').get(getScores).post(filter, createScore)

module.exports = router