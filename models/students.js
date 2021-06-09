
const { Schema, model } = require('mongoose')

// const studentSchema=Schema({.....................this=>value...................................})

const Student = model('student', Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 0, required: true },
    hobbies: {
        type: Array,
        of: String,
        validate: {
            validator: value => value.length > 0,
            messages: "Please Insert at least One Hobby"
        }
    }
}))


exports.Student = Student