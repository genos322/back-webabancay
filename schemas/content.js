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
  imageExtension: z.string({
    invalid_type_error: 'Content imageExtension must be a string',
    required_error: 'Content imageExtension is required.'
  }),
  location: z.string({
    invalid_type_error: 'Content location must be a string',
    required_error: 'Content location is required.'
  }),
  entryPrice: z.number().positive({
    invalid_type_error: 'Content entryPrice must be a postive number',
    required_error: 'Content entryPrice is required.'
  }),
  timeTravel:z.number().positive({
    invalid_type_error: 'Content timeTravel must be a postive number',
    required_error: 'Content timeTravel is required.'
  }),
})

export function validateContent (input) {
  return contentSchema.safeParse(input)
}

export function validatePartialContent (input) {//validación parcial útil para cuando se actualiza un recurso
  return contentSchema.partial().safeParse(input)
}
