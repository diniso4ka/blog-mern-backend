import { body } from 'express-validator'

export const registerVadiladion = [
   body('email', 'Неверный формат почты.').isEmail(),
   body('fullName', 'Имя должно содержать от 2 до 14 символов.').isLength({ min: 2, max: 14 }),
   body('password', 'Пароль должен содержать от 6 до 24 символов.').isLength({ min: 6, max: 24 }),
   body('imgUrl', 'Неверный формат ссылки.').optional().isURL()
]

export const loginVadiladion = [
   body('email', 'Неверный формат почты.').isEmail(),
   body('password', 'Пароль должен содержать от 6 до 24 символов.').isLength({ min: 6, max: 24 }),
]

export const postCreateVadiladion = [
   body('title', 'Заголовок должен содержать минимум 3 символа.').isLength({ min: 3 }).isString(),
   body('text', 'Текст статьи должен содержать минимум 10 символов.').isLength({ min: 10 }),
   body('tags', 'Неверный формат тэгов.').optional().isArray(),
   body('imgUrl', 'Неверный формат ссылки.').optional()
] 