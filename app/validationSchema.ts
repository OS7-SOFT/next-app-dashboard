import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "This field is required").max(255),
  description: z.string().min(20, "Must be larger than 20 character"),
});
