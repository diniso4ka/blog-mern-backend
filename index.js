import express from 'express'
import mongoose from 'mongoose';
import multer from 'multer'

import cors from 'cors'

import { registerVadiladion, loginVadiladion, postCreateVadiladion } from './validations/validations.js'
import { checkAuth, handleValidationsErrors } from './utils/index.js'
import { CommentController, PostController, UserController } from './controllers/index.js'



mongoose
   .connect(process.env.MONGODB_URI)
   .then(() => console.log('DB ok'))
   .catch((err) => console.log('DB error', err))


const app = express()
const storage = multer.diskStorage({
   destination: (_, __, cb) => {
      cb(null, 'uploads');
   },
   filename: (_, file, cb) => {
      cb(null, file.originalname);
   },
});

const upload = multer({ storage });



app.listen(process.env.PORT || 4444, (err) => {
   if (err) {
      return console.log(err);
   }
   console.log('SERVER OK');
})

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(cors())


app.post('/auth/register', registerVadiladion, handleValidationsErrors, UserController.register)
app.post('/auth/login', loginVadiladion, handleValidationsErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
   res.json({
      url: `/uploads/${req.file.originalname}`,
   });
});
app.get('/tags', PostController.getLastTags)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateVadiladion, handleValidationsErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateVadiladion, handleValidationsErrors, PostController.update)

app.post('/posts/:id/comments', checkAuth, CommentController.addComment)
app.get('/posts/:id/comments', CommentController.getComments)