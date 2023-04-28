const mongoose = require('mongoose');
const modelDataSchema = new mongoose.Schema({
inputVar:{
    type:String,
    required: true 
},
question: {
    type:String,
    required: true
}
});
const modelData = new mongoose.model('modelData', modelDataSchema);
module.exports =modelData;

