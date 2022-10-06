import CommentModel from '../models/Comment.js'

export const addComment = async (req, res) => {
   try {
      const postId = req.params.id
      if (!postId) {
         return res.json('Не удалось добавить комментарий')
      }
      const doc = new CommentModel({
         text: req.body.text,
         user: req.userId,
         postId: req.params.id
      })
      const comment = await doc.save()
      res.json(comment)
   } catch (err) {
      res.status(500).json('Не удалось добавить комментарий')
   }
}

export const getComments = async (req, res) => {
   try {
      const comments = await CommentModel.find().populate('user').exec()
      if (!comments) {
         res.status(200).json({
            message: 'Не удалось найти статью.'
         })
      }
      res.json(comments)
   } catch (err) {
      res.status(500).json({
         message: 'Не удалось получить статьи.'
      })
   }
}