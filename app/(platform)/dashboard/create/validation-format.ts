import * as z from "zod";

export const createLessonFormSchema = z.object({
  title: z.string().default(""),
  description: z.string().default(""),
  explanation: z.string(),
  difficultyLevel: z.string({
    required_error: "Please select the level.",
  }),
  source: z
    .array(
      z.object({
        title: z.string().optional(),
        type: z.string(),
        url: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  questions: z.array(
    z.object({
      title: z.string(),
      options: z.array(
        z.object({
          content: z.string(),
          isCorrect: z.enum(["true", "false"]),
        })
      ),
    })
  ),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  relatedLessons: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    })
    .optional(),
});

export type CreateLessonFormValues = z.infer<typeof createLessonFormSchema>;
