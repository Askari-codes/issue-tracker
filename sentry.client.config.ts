// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://892c589e58cf6d5d4619483a4d20ddaf@o4508295151419392.ingest.de.sentry.io/4508295156924496",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
