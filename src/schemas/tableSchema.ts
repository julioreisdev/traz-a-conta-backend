import joi from "joi";

const tableSchema = joi.object({
  description: joi.string().required(),
});

export default tableSchema;
