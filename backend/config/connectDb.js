const mongoose = require('mongoose');
require('doten').config()

const dbConnect = async()=>{
    mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log('Database connected with succes');
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = dbConnect;