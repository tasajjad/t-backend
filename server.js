
const dotenv=require('dotenv')
dotenv.config({path:"./config.env"})
const mongoose = require('mongoose');
const app=require('./app')



//console.log(app.get('env')) // set by express

//console.log(process.env.NODE_ENV) // Set by NODE

mongoose.connect("mongodb://localhost:27017/my-students", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndexes:true
})
  .then(() => {
    console.log("Connected to MongoDb")
  })
  .catch(err => {
    console.log("Connection Failed")
  })



const port =process.env.PORT;

app.listen(port, () => {
  console.log(`I am Listening on port ${port}`)
})


