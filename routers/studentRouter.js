const express = require('express')
const { Student } = require('../models/students')
const router = express.Router()
const authorize = require('../middlewares/authorize')
const admin = require('../middlewares/admin')



const studentsList = async (req, res) => {


   try {
      const students = await Student.find().sort({ name: 1 })


      res.send(students)

   } catch (err) {
      return res.status(404).send("Not Found")
   }



}

const studentsPOST = async (req, res) => {

   const student = new Student(req.body)

   try {
      const result = await student.save()
      res.send(result)
   } catch (err) {
      const errMsg = []
      for (field in err.errors) {
         errMsg.push(err.errors[field].message)
         return res.status(400).send(errMsg)
      }
   }


}

const studentsListIndividual = async (req, res) => {
   const id = req.params.id;

   try {

      const students = await Student.findById(id)
      if (!students) {
         return res.status(404).send("ID not foud Here")
      }
      res.send(students)


   } catch (err) {
      return res.status(404).send("ID not foud Here")

   }


}

// PUT for Any Current DATA Update

const studentsPUT = async (req, res) => {
   const id = req.params.id;
   const updatedData = req.body;


   try {
      const students = await Student.findByIdAndUpdate(id, updatedData,
         { new: true, useFindAndModify: false });

      if (!students) return res.status(404).send("ID not foud Here")

      //console.log(students)
      res.send(students) // first req.send() . This is So Funny
   } catch (err) {
      return res.status(404).send("Cannot Update Data . Id not found")

   }

}

const studentsDELETE = async (req, res) => {
   const id = req.params.id


   try {
      const students = await Student.findByIdAndDelete(id);

      if (!students) return res.status(404).send("ID not foud Here")

      //console.log(students)
      res.send(students) // first req.send() . This is So Funny
   } catch (err) {
      return res.status(404).send("Cannot Update Data . Id not found")

   }

}


// Use app.route function 



router.route('/')
   .get(authorize, studentsList)
   .post(authorize, studentsPOST)


router.route('/:id')
   .get(studentsListIndividual)
   .put(studentsPUT)
   .delete([authorize, admin], studentsDELETE)

module.exports = router;