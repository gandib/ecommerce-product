import z from 'zod';

const productValidationSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)),
  variants: z.array(
    z.object({
      type: z.string().min(1),
      value: z.string().min(1),
    }),
  ),
  inventory: z.object({
    quantity: z.number().min(1),
    inStock: z.boolean().default(true),
  }),
});

export default productValidationSchema;
