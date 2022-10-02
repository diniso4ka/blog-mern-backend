import express from 'express'
import mongoose from 'mongoose';

import { registerVadiladion } from './validations/auth.js'
import { validationResult } from 'express-validator';

mongoose
   .connect('mongodb+srv://diniso4ka:testtest@cluster0.nqklddr.mongodb.net/blog-mern?retryWrites=true&w=majority')
   .then(() => console.log('DB ok'))
   .catch((err) => console.log('DB error'))


const app = express()
app.use(express.json())


app.listen(3333, (err) => {
   if (err) {
      return console.log(err);
   }
   console.log('SERVER OK');
})

app.post('/auth/register', registerVadiladion, (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
   } else {
      res.json({
         succes: true
      })
   }
})