import { z } from 'zod';

export const createIssuesSchema = z.object({
    title: z.string().min(4, 'Sorry title can not be empty').max(255),
    description: z.string().min(5, 'description should not be empty')
});
