import joi from 'joi'

const attendantRegisterSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().required()
})

export default attendantRegisterSchema