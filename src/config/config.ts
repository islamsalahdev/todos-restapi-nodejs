import z from "zod";
const envSchema = z.object({
  MONGODB_URI: z
    .string({
      required_error: "ENV MONGODB_URI required ",
    })
    .nonempty()
    .url({
      message: "Invalid MONGODB_URI",
    }),

  JWT_ACCESS_SECRET: z
    .string({
      required_error: "Env JWT_ACCESS_SECRET required",
    })
    .nonempty(),
  JWT_REFRESH_SECRET: z
    .string({
      required_error: "Env JWT_REFRESH_SECRET required",
    })
    .nonempty(),
  JWT_ACCESS_LIFETIME: z
    .string({ required_error: "JWT_ACCESS_LIFETIME required" })
    .nonempty(),

  JWT_REFRESH__LIFETIME: z
    .string({ required_error: "JWT_REFRESH__LIFETIME required" })
    .nonempty(),
  PORT: z.custom((port) => !isNaN(port as number), {
    message: "Invalid PORT",
  }),
  METRICS_PORT: z.custom((port) => !isNaN(port as number), {
    message: "Invalid METRICS PORT",
  }),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  ORIGIN: z.string().url().default("localhost:3000"),
});

const parsed = envSchema.safeParse(process.env);

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const config = parsed.data;
