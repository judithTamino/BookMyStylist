import { loginSchema, userSchema, workingHoursSchema } from "../validations/user.validation.js";
import { serviceSchema } from "../validations/service.validation.js";
import { appointmentSchema } from "../validations/appointment.validation.js";

export const userValidation = user => {
  const { error } = userSchema.validate(user);
  if (error) return error.details.map(detail => detail.message);
}

export const loginValidation = user => {
  const { error } = loginSchema.validate(user);
  if (error) return error.details.map(detail => detail.message);
}

export const workingHouresValidation = dayEntry => {
  const { error } = workingHoursSchema.validate(dayEntry);
  if (error) return error.details.map(detail => detail.message);
};

export const serviceValidation = service => {
  const { error } = serviceSchema.validate(service);
  if (error) return error.details.map(detail => detail.message);
};

export const appointmentValidation = appointment => {
  const { error } = appointmentSchema.validate(appointment);
  if (error) return error.details.map(detail => detail.message);
}

