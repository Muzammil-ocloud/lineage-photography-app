import type { Metadata } from "next";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";

export const metadata: Metadata = {
  title: "Reset password",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Set new password"
      description="Enter your new password below"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
