import { loginSchema, userSchema } from "../validations/user.validation.js";
import { serviceSchema } from "../validations/service.validation.js";

export const userValidation = user => {
  const { error } = userSchema.validate(user);
  if (error) return error.details.map(detail => detail.message);
}

export const loginValidation = user => {
  const { error } = loginSchema.validate(user);
  if (error) return error.details.map(detail => detail.message);
}

export const serviceValidation = service => {
  const {error} = serviceSchema.validate(service);
  if (error) return error.details.map(detail => detail.message);
};