import joi from 'joi'

const companyLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export default companyLoginSchema