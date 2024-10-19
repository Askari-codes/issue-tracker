import {z} from 'zod'

 export const createIssueSchema = z.object({
    title: z.string().min(1,'the title is required').max(255),
    description: z.string().min(1,'description is required'),
  });