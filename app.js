const express = require('express');
const studentRouter = require('./routers/studentRouter')
const app = express();
const userRouter= require('./routers/userRouter');
const morgan = require('morgan');
const authRouter=require('./routers/authRouter');




app.use(express.json())

if(process.env.NODE_ENV=='development'){
	
	app.use(morgan('dev'))
}

app.use('/api/students/', studentRouter)

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.get('/', (req, res) => {

  res.send('Hello i am express server ')


})

module.exports=app

