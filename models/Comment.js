import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   text: {
      type: String,
      required: true
   },
   postId: {
      type: mongoose.ObjectId,
      required: true
   }
},
   {
      timestamps: true
   })


export default mongoose.model('Comment', CommentSchema)
