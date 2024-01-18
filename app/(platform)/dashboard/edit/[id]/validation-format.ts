import * as z from "zod";

export const updateLessonFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  explanation: z.string(),
  difficultyLevel: z.string({
    required_error: "Please select the level.",
  }),
  source: z
    .array(
      z.object({
        title: z.string().optional().nullable().default(""),
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
  relatedLessons: z.array(z.string()).optional(),
});

export type UpdateLessonFormValues = z.infer<typeof updateLessonFormSchema>;
