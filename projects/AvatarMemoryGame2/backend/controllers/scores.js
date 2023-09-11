//error
const mongoose = require('mongoose')
const { StatusCodes, PERMANENT_REDIRECT } = require('http-status-codes')
const Score = require('../models/score')

const getScores =async (req,res) =>{
    try {
        let scores = await Score.find();
        let filteredScores = [];
        scores.forEach(score => {
            filteredScores.push({
                name: score.name, 
                score: score.score });
        });
        console.log(filteredScores);
       
        filteredScores.sort((a, b) => a.score - b.score);
        res.status(StatusCodes.OK).json({ filteredScores })
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