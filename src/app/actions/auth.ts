"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authService } from "@/services/auth.service";
import { profileService } from "@/services/profile.service";
import {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/validations/auth";
import { ROUTES } from "@/lib/constants/routes";
import { createClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
  success?: string;
};

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const { user } = await authService.login(parsed.data);
    if (user) {
      await profileService.ensureProfile(
        user.id,
        user.email ?? parsed.data.email,
        (user.user_metadata?.full_name as string | undefined) ?? null,
      );
    }
    revalidatePath("/", "layout");
    redirect(ROUTES.dashboard);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      error: error instanceof Error ? error.message : "Login failed",
    };
  }
}

export async function signupAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    fullName: formData.get("fullName"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const { user } = await authService.signup(parsed.data);
    if (user) {
      await profileService.ensureProfile(
        user.id,
        user.email ?? parsed.data.email,
        parsed.data.fullName,
      );
    }
    revalidatePath("/", "layout");
    return {
      success: "Account created! Check your email to confirm your account.",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Signup failed",
    };
  }
}

export async function logoutAction() {
  await authService.logout();
  revalidatePath("/", "layout");
  redirect(ROUTES.login);
}

export async function forgotPasswordAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await authService.forgotPassword(parsed.data.email);
    return { success: "Password reset link sent to your email." };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Request failed",
    };
  }
}

export async function resetPasswordAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password: parsed.data.password,
    });

    if (error) throw error;

    revalidatePath("/", "layout");
    redirect(ROUTES.login);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      error: error instanceof Error ? error.message : "Reset failed",
    };
  }
}
