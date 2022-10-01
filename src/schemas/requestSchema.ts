import joi from "joi";

const requestSchema = joi.object({
  tableId: joi.number().required(),
  productId: joi.number().required(),
});

export default requestSchema;
