import z from 'zod'

const contentSchema = z.object({
  title: z.string({
    invalid_type_error: 'Content title must be a string',
    required_error: 'Content title is required.'
  }),
  mainContent: z.string({
    invalid_type_error: 'Content mainContent must be a string',
    required_error: 'Content mainContent is required.'
  }),
  nameImage0: z.string().optional(),
  nameImage1: z.string().optional(),
  nameImage2: z.string().optional(),
  nameImage3: z.string().optional(),
  nameImage4: z.string().optional(),

  location: z.string({
    invalid_type_error: 'Content location must be a string',
    required_error: 'Content location is required.'
  }),
  entryPrice: z.string({//validación como string debido a que postman no acepta number
    invalid_type_error: 'Content entryPrice must be a number',
    required_error: 'Content entryPrice is required.'
  }),
  timeTravel: z.string({
    invalid_type_error: 'Content timeTravel must be a number',
    required_error: 'Content timeTravel is required.'
  }),
})

export function validateContent (input) {
  return contentSchema.safeParse(input)
}

export function validatePartialContent (input) {//validación parcial útil para cuando se actualiza un recurso
  return contentSchema.partial().safeParse(input)
}
