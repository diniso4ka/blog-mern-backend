import PostModel from '../models/Post.js'


export const create = async (req, res) => {
   try {
      const doc = new PostModel({
         title: req.body.title,
         text: req.body.text,
         imgUrl: req.body.imgUrl,
         tags: req.body.tags,
         user: req.userId
      })
      const post = await doc.save()
      res.json(post)
   } catch (err) {
      console.log(err)
      res.status(500).json({
         message: 'Не удалось создать статью.'
      })
   }
}

export const getAll = async (req, res) => {
   try {
      const posts = await PostModel.find().populate('user').exec()
      if (!posts) {
         res.status(200).json({
            message: 'Список статей пуст.'
         })
      }
      res.json(posts)
   } catch (err) {
      res.status(500).json({
         message: 'Не удалось получить статьи.'
      })
   }
}


export const getOne = async (req, res) => {
   try {
      const postId = req.params.id

      PostModel.findOneAndUpdate(
         {
            _id: postId,
         },
         {
            $inc: { viewsCount: 1 },
         },
         {
            returnDocument: 'after',
         },
         (err, doc) => {
            if (err) {
               console.log(err);
               return res.status(500).json({
                  message: 'Не удалось вернуть статью',
               });
            }

            if (!doc) {
               return res.status(404).json({
                  message: 'Статья не найдена',
               });
            }
            res.json(doc);

         }
      ).populate('user')

   } catch (err) {
      res.status(500).json({
         message: 'Не удалось получить статьи.',
      })
   }
}

export const remove = async (req, res) => {
   try {
      const postId = req.params.id;

      PostModel.findByIdAndDelete(
         {
            _id: postId
         },
         (err, doc) => {
            if (err) {
               res.status(500).json({
                  message: 'Не удалось удалить статью.',
               })
            }
            if (!doc) {
               res.status(404).json({
                  message: 'Статья не найдена.',
               })
            }

            res.json({
               succes: true
            })
         }
      )
   } catch (err) {
      res.status(500).json({
         message: 'Не удалось получить статьи.',
      })
   }
}


export const update = async (req, res) => {
   try {
      const postId = req.params.id;

      await PostModel.updateOne(
         {
            _id: postId,
         },
         {
            title: req.body.title,
            text: req.body.text,
            imgUrl: req.body.imgUrl,
            tags: req.body.tags,
            user: req.userId
         },
      );

      res.json({
         success: true,
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не удалось обновить статью',
      });
   }
};