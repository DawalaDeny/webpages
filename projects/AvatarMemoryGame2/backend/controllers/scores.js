const { StatusCodes } = require('http-status-codes')
const invalidBody = require('../errors/invalidBody')
const Score = require('../models/score')

const getScores =async (req,res) =>{
    //de await
    try {
        let scores =  Score.find()
        scores = await scores.sort("score");
        res.status(StatusCodes.OK).json({ scores })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ err:error.message })
    }
    
}

const createScore =async (req,res) =>{
    const {name, score} = req.body
    if (!name || !score){
        throw new invalidBody('Missing fields')
    }
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