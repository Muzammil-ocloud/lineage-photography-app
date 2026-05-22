"use client";

import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileUpdateSchema,
  type ProfileUpdateInput,
} from "@/validations/profile";
import {
  updateProfileAction,
  type ProfileActionState,
} from "@/app/actions/profile";
import type { Profile } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/forms/form-field";
import { toast } from "sonner";

const initialState: ProfileActionState = {};

interface ProfileFormProps {
  profile: Profile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    initialState,
  );

  const {
    register,
    formState: { errors },
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      full_name: profile.full_name ?? "",
      bio: profile.bio ?? "",
      avatar_url: profile.avatar_url ?? "",
    },
  });

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) toast.success(state.success);
  }, [state.error, state.success]);

  return (
    <form action={formAction} className="space-y-4">
      <FormField
        label="Full name"
        htmlFor="full_name"
        error={errors.full_name?.message}
      >
        <Input id="full_name" {...register("full_name")} name="full_name" />
      </FormField>

      <FormField label="Bio" htmlFor="bio" error={errors.bio?.message}>
        <Textarea id="bio" {...register("bio")} name="bio" rows={4} />
      </FormField>

      <FormField
        label="Avatar URL"
        htmlFor="avatar_url"
        error={errors.avatar_url?.message}
      >
        <Input
          id="avatar_url"
          type="url"
          placeholder="https://..."
          {...register("avatar_url")}
          name="avatar_url"
        />
      </FormField>

      <Button type="submit" isLoading={isPending}>
        Save changes
      </Button>
    </form>
  );
}
