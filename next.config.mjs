/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.loom.com", "us06web.zoom.us"],
  },
  // For internationalization, use middleware or the App Router's built-in i18n support
};
export default config;
