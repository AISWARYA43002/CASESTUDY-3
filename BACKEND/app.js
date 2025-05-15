const express=require('express')
const morgan = require('morgan')
const app=express()
const cors=require('cors')
const adminRoutes=require('./routes/adminRoutes')
const userRoutes=require('./routes/userRoutes')
require('dotenv').config()
require('./db/connection')
app.use(morgan('dev'))
app.use(cors());
app.use(express.json())
app.use('/admin',adminRoutes);
app.use('/user',userRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
});