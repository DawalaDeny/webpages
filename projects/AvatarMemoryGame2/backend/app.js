require('express-async-errors');
require('dotenv').config()

const helmet = require('helmet');
const express = require ("express");
const app = express();
const port= process.env.PORT || 80;

const connectDB = require('./db/dbConnect')
const scores = require("./routes/scores")
const xss = require('xss-clean');
const errorHandler = require('./middleware/errorHandlerMiddleware')

//middleware
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'], 
        
      },
    })
  );
app.use(xss())
app.use(express.json())
app.use(express.static('../frontend'))

app.use('/api/v1/scores', scores)
app.get('/', (req, res)=>{
    res.send(index.html)
})
app.use(errorHandler);

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening to port: ${port}...`));

    } catch (error) {
        console.log(error);
    }
}

start();
