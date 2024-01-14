const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type:String,
        required: [true, 'Please provide a company name'],
        maxlenght: 100
    },
    position: {
        type:String,
        required: [true, 'Please provide position'],
        maxlenght: 100
    },
    status: {
        type:String,
        emun: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User', //refering to the user model to get the user who created the record
        require: [true, 'Please provider user']
    }
}, {timestamps:true})

module.exports = mongoose.model('Job', JobSchema)