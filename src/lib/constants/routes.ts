export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  dashboard: "/dashboard",
  schedule: "/schedule",
  clients: "/clients",
  jobs: "/jobs",
  job: (id: string) => `/jobs/${id}`,
  galleries: "/galleries",
  photos: "/photos",
  settings: "/settings",
} as const;

export const AUTH_ROUTES = [
  ROUTES.login,
  ROUTES.signup,
  ROUTES.forgotPassword,
  ROUTES.resetPassword,
] as const;

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

export function isProtectedRoute(pathname: string): boolean {
  if (pathname === ROUTES.home) return false;
  return !isAuthRoute(pathname);
}
