import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Profile, ProfileUpdate } from "@/types/database";
import { ApiError } from "@/types/api";

type Supabase = SupabaseClient<Database>;

export class ProfileRepository {
  constructor(private readonly supabase: Supabase) {}

  async findById(id: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error?.code === "PGRST116") return null;
    if (error) throw new ApiError(error.message, 500);

    return data;
  }

  async findAll(): Promise<Profile[]> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new ApiError(error.message, 500);
    return data ?? [];
  }

  async create(
    profile: Database["public"]["Tables"]["profiles"]["Insert"],
  ): Promise<Profile> {
    const { data, error } = await this.supabase
      .from("profiles")
      .insert(profile)
      .select()
      .single();

    if (error) throw new ApiError(error.message, 500);
    return data;
  }

  async update(id: string, updates: ProfileUpdate): Promise<Profile> {
    const { data, error } = await this.supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new ApiError(error.message, 500);
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (error) throw new ApiError(error.message, 500);
  }
}
