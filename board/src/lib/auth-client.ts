import { createAuthClient } from "better-auth/client";
import { clientEnv } from "../env";

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_API_URL,
});
