import type { Metadata } from "next";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account to continue"
    >
      <LoginForm />
    </AuthLayout>
  );
}
