const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: false},
    linkTo: {type: String, required: false},
    pages: {type: Number, required: false},
    date: {type: Date, default: Date.now},
    deadline: {type: Date, required: false},
    owner: {type: Types.ObjectId, ref: 'User'}
})


module.exports = model('Book', schema)