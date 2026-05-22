import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProfileRepository } from "@/repositories/profile.repository";
import type { ProfileUpdateInput } from "@/validations/profile";
import { ApiError } from "@/types/api";
import type { Profile } from "@/types/database";

export class ProfileService {
  private async getRepository() {
    const supabase = await createClient();
    return new ProfileRepository(supabase);
  }

  async getProfile(userId: string): Promise<Profile> {
    const repo = await this.getRepository();
    const profile = await repo.findById(userId);

    if (!profile) {
      throw new ApiError("Profile not found", 404);
    }

    return profile;
  }

  async getAllProfiles(): Promise<Profile[]> {
    const repo = await this.getRepository();
    return repo.findAll();
  }

  async updateProfile(
    userId: string,
    input: ProfileUpdateInput,
  ): Promise<Profile> {
    const repo = await this.getRepository();
    return repo.update(userId, input);
  }

  async ensureProfile(
    userId: string,
    email: string,
    fullName?: string | null,
  ): Promise<Profile> {
    // Service role bypasses missing grants during bootstrap; user RLS applies for normal CRUD.
    const repo = new ProfileRepository(createAdminClient());
    const existing = await repo.findById(userId);

    if (existing) return existing;

    return repo.create({
      id: userId,
      email,
      full_name: fullName ?? null,
    });
  }
}

export const profileService = new ProfileService();
