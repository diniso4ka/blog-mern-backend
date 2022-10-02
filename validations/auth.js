import { body } from 'express-validator'

export const registerVadiladion = [
   body('email', 'Неверный формат почты.').isEmail(),
   body('fullName', 'Имя должно содержать от 2 до 14 символов.').isLength({ min: 2, max: 14 }),
   body('password', 'Пароль должен содержать от 6 до 24 символов.').isLength({ min: 6, max: 24 }),
   body('imageUrl', 'Неверный формат ссылки.').optional().isURL()
]