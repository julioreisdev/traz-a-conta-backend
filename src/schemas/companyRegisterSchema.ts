import joi from 'joi'

const companyRegisterSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    url: joi.string().uri().required(),
    password: joi.string().required()
})

export default companyRegisterSchema