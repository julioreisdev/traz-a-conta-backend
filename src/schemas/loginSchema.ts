import joi from 'joi'

const loginSchema = joi.object({
    user: joi.string().required(),
    password: joi.string().required()
})

export default loginSchema