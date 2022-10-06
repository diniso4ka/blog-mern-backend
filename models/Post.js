import mongoose from 'mongoose'

const PostShema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   text: {
      type: String,
      required: true,
      unique: true,
   },
   tags: {
      type: Array,
      default: []
   },
   viewsCount: {
      type: Number,
      default: 0
   },
   imgUrl: String,
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
},
   {
      timestamps: true
   })


export default mongoose.model('Post', PostShema)