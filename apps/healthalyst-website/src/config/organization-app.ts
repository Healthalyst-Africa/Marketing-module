/**
 * The organisation app in healthalyst-frontend, where institutions sign up
 * and sign in. Production is account.healthalystafrica.com and development
 * the app's local port; `NEXT_PUBLIC_HEALTHALYST_ORGANIZATION_APP_URL` (the
 * name the frontend repository uses) overrides either, for example for a
 * staging deployment.
 */
const ORGANIZATION_APP_ADDRESS =
  process.env.NEXT_PUBLIC_HEALTHALYST_ORGANIZATION_APP_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3005"
    : "https://account.healthalystafrica.com");

/** Routes owned by the organisation app. */
export const ORGANIZATION_APP_ROUTES = {
  signUp: new URL("/", ORGANIZATION_APP_ADDRESS).toString(),
  signIn: new URL("/sign-in", ORGANIZATION_APP_ADDRESS).toString(),
} as const;

/**
 * Labels for links into the organisation app. Get started (sign up) is the
 * site's main call to action, so every section that offers it uses this one
 * label.
 */
export const ORGANIZATION_APP_ACTIONS = {
  signUpLabel: "Get started",
  signInLabel: "Sign in",
} as const;
