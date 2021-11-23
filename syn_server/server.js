const express = require('express');
const app = express();
const elasticRoutes = require('./routes/elasticRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
require('./database/dbconfig')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({credentials: true, origin:'http://localhost:3000'}))
app.use(helmet())

 

// désactive l'en tête qui permet de detecter les applications utilisé par express
app.disable('x-powered-by')



let port = process.env.PORT || 8080

app.use('/api/v1/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/api/v1',elasticRoutes);

app.listen(port,()=>{
    console.log(`the server is listening on port ${port}`)
})
