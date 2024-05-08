const mongoose = require('mongoose');

const mongooseConnect = async()=>{
    
try {
    await mongoose.connect('mongodb://127.0.0.1:27017/demo', {
    });
} catch (error) {
    console.log(`Error on connecting mongoDB`, error);
}
}
module.exports = mongooseConnect;