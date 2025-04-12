import { z } from "zod";

export const healthcareFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.coerce.number().min(18, {
    message: "Age must be at least 18 years.",
  }).max(120, {
    message: "Age must be less than 100 years.",
  }),
  dependents: z.coerce.number().min(0, {
    message: "Dependents must be 0 or more.",
  }).max(20, {
    message: "Dependents must be less than 20.",
  }),
  zipCode: z.string().regex(/^\d{5}$/, {
    message: "Zip code must be 5 digits.",
  }),
  state: z.string().length(2, {
    message: "State must be a 2-letter code.",
  }),
  income: z.string().regex(/^\$?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})?$/, {
    message: "Please enter a valid income amount.",
  }),
  dentalPlanRequired: z.enum(["yes", "no"], {
    required_error: "Please select if dental plan is required.",
  }),
});

export type HealthcareFormValues = z.infer<typeof healthcareFormSchema>; 