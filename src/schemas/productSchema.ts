import joi from "joi";

const productSchema = joi.object({
  name: joi.string().required(),
  amount: joi.number().required(),
});

export default productSchema;
