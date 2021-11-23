const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(
    process.env.MONGO_DB, 
    {useNewUrlParser: true, useUnifiedTopology: true },
)
.then(()=> console.log('mongo connected'))
.catch((err)=> console.log('connection failed',err))
