import express from 'express'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import { registerVadiladion } from './validations/auth.js'
import { validationResult } from 'express-validator';

import UserModel from './models/User.js'

mongoose
   .connect('mongodb+srv://diniso4ka:qwerty123@cluster0.nqklddr.mongodb.net/blog-mern?retryWrites=true&w=majority')
   .then(() => console.log('DB ok'))
   .catch((err) => console.log('DB error', err))


const app = express()
app.use(express.json())


app.listen(3333, (err) => {
   if (err) {
      return console.log(err);
   }
   console.log('SERVER OK');
})

app.post('/auth/register', registerVadiladion, async (req, res) => {
   try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json(errors.array())
      }
      const password = req.body.password
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const doc = new UserModel({
         email: req.body.email,
         fullName: req.body.fullName,
         avatarUrl: req.body.avatarUrl,
         passwordHash: hash,
      })

      const user = await doc.save()
      const token = jwt.sign(
         {
            _id: user._id
         },
         'SECRET_KEY',
         {
            expiresIn: '30d'
         }
      )

      const { passwordHash, ...userData } = user._doc

      res.json({ ...userData, token })
   } catch (err) {
      res.status(500).json(err)
   }
})

app.post('/auth/login', async (req, res) => {
   try {
      const user = await UserModel.findOne({ email: req.body.email })
      if (!user) {
         res.status(404).json('Пользователь не найден')
      }

      const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
      if (!isValidPass) {
         return res.status(400).json({
            message: 'Неверный логин или пароль'
         })
      }
      const token = jwt.sign(
         {
            _id: user._id
         },
         'SECRET_KEY',
         {
            expiresIn: '30d'
         }
      )

      const { passwordHash, ...userData } = user._doc

      res.json({ ...userData, token })
   } catch (err) {
      res.status(500).json(err)
   }
})

