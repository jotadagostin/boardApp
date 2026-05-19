import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url().optional(),
});

export const clientEnv = clientEnvSchema.parse(process.env);

// export const clientEnv = {
//   NEXT_PUBLIC_API_URL:
//     process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
// };
