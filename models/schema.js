const mongoose = require('mongoose')

const userschem = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
    
        age: {
            type: Number,
            required: true,
        },
        class: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        }
    }
 
)


const userschema = mongoose.model('userschema', userschem);

module.exports = userschema;