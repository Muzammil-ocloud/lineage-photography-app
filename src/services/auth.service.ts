import { createClient } from "@/lib/supabase/server";
import type { LoginInput, SignupInput } from "@/validations/auth";
import { ApiError } from "@/types/api";

export class AuthService {
  async login(input: LoginInput) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) throw new ApiError(error.message, 401);
    return data;
  }

  async signup(input: SignupInput) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: { full_name: input.fullName },
      },
    });

    if (error) throw new ApiError(error.message, 400);
    return { user: data.user, session: data.session };
  }

  async logout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new ApiError(error.message, 500);
  }

  async forgotPassword(email: string) {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/reset-password`,
    });

    if (error) throw new ApiError(error.message, 400);
  }

  async getSession() {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw new ApiError(error.message, 500);
    return user;
  }
}

export const authService = new AuthService();
