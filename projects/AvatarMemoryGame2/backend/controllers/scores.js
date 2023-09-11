//error

const { StatusCodes, PERMANENT_REDIRECT } = require('http-status-codes')
const Score = require('../models/score')

const getScores =async (req,res) =>{
    try {
        const scores = await Score.find();
        res.status(StatusCodes.OK).json({ scores })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ err:error.message })
    }
    
}

const createScore =async (req,res) =>{
    try {
        const score = await Score.create(req.body)
        res.status(StatusCodes.CREATED).json({ score })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ err:error.message })
    }
    
}

module.exports = {
    getScores, createScore
  }