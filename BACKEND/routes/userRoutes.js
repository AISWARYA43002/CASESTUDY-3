const express=require('express')
const router=express.Router()
const {verifyToken}=require('../middleware/auth')
const Employee=require('../model/empData')
const userData=require('../model/userData')
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.get('/viewemps',verifyToken,async(req,res)=>{
    const emps=await Employee.find()
    res.json(emps)
})
router.post('/:role/login', async (req, res) => {
    const { role } = req.params;
    const { email, password } = req.body;
  
    try {
      const user = await userData.findOne({ email, role });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found or role mismatch' });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      });
  
      res.json({ token, user });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports=router