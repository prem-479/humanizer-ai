import { z } from 'zod';

// Strip HTML tags to prevent injection
const stripHtml = (text: string): string => {
    return text.replace(/<[^>]*>/g, '');
};

// Humanization request schema
export const humanizeRequestSchema = z.object({
    text: z.string()
        .min(3, 'Text must be at least 3 characters')
        .max(10000, 'Text must not exceed 10,000 characters')
        .transform(stripHtml)
        .refine(
            (text) => text.trim().length >= 3,
            'Text must contain at least 3 non-whitespace characters'
        ),
    tone: z.enum(['neutral', 'professional', 'casual', 'academic', 'storytelling']),
    intensity: z.number()
        .int()
        .min(0)
        .max(100)
});

export type HumanizeRequest = z.infer<typeof humanizeRequestSchema>;

// Validate and sanitize input
export function validateHumanizeInput(input: unknown): HumanizeRequest {
    return humanizeRequestSchema.parse(input);
}
