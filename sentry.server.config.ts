import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN: string = process.env.SENTRY_DSN || "";
const SENTRY_RELEASE: string = process.env.SENTRY_RELEASE || "";
const SENTRY_ENV: string = process.env.SENTRY_ENV || "local";


if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,
        tracesSampleRate: 0.25,
        release: SENTRY_RELEASE,
        environment: SENTRY_ENV,
      });
}
