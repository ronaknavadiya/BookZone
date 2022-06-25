const mongoose = require("mongoose")

const BooksSchema = new mongoose.Schema({
    bookId:{
        type:String,
        required:[true,"please provide book ID"]
    },
    feedback:{
        type:Array,
        default:[]
    }
})

module.exports = mongoose.model('Books',BooksSchema)