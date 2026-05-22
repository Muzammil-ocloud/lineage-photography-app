import type { Metadata } from "next";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { SignupForm } from "@/components/forms/signup-form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Get started with Lineage Photography"
    >
      <SignupForm />
    </AuthLayout>
  );
}
