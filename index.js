import express from 'express'
import mongoose from 'mongoose';

const app = express()
app.use(express.json())

mongoose
   .connect('mongodb+srv://diniso4ka:testtest@cluster0.nqklddr.mongodb.net/?retryWrites=true&w=majority')
   .then(() => console.log('DB ok'))
   .catch((err) => console.log(err))

app.listen(3333, (err) => {
   if (err) {
      return console.log(err);
   }
   console.log('SERVER OK');
})

app.get('/', (req, res) => {
   res.send('helloworld')
})