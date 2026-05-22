"use client";

import { CheckCircle2 } from "lucide-react";
import { StudioButton } from "@/components/studio/studio-button";
import type { Client } from "@/lib/mock/studio.types";

function StudioForm({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (data: Record<string, string>) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(
          Object.fromEntries(new FormData(e.currentTarget)) as Record<
            string,
            string
          >,
        );
      }}
      className="space-y-4"
    >
      {children}
      <div className="flex justify-end pt-3">
        <StudioButton type="submit" variant="primary" icon={CheckCircle2}>
          Save
        </StudioButton>
      </div>
    </form>
  );
}

function FormInput({
  name,
  label,
  type = "text",
  required = true,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 h-11 w-full rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-200"
        style={{ borderColor: "var(--lineage-line)" }}
      />
    </label>
  );
}

function FormSelect({
  name,
  label,
  children,
}: {
  name: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <select
        name={name}
        required
        className="mt-2 h-11 w-full rounded-xl border bg-white px-3 outline-none"
        style={{ borderColor: "var(--lineage-line)" }}
      >
        {children}
      </select>
    </label>
  );
}

export function ClientForm({
  onSave,
}: {
  onSave: (data: Record<string, string>) => void;
}) {
  return (
    <StudioForm onSubmit={onSave}>
      <FormInput name="name" label="Client name" />
      <FormInput name="email" label="Email" type="email" />
      <FormInput name="phone" label="Phone" />
      <FormInput name="notes" label="Notes" required={false} />
    </StudioForm>
  );
}

export function JobForm({
  clients,
  onSave,
}: {
  clients: Client[];
  onSave: (data: Record<string, string>) => void;
}) {
  return (
    <StudioForm onSubmit={onSave}>
      <FormSelect name="clientId" label="Client">
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </FormSelect>
      <FormInput name="title" label="Job title" />
      <div className="grid grid-cols-2 gap-3">
        <FormInput name="type" label="Type" />
        <FormInput name="date" label="Date" type="date" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormInput name="time" label="Time" />
        <FormInput name="location" label="Location" />
      </div>
      <FormInput name="notes" label="Job notes" required={false} />
    </StudioForm>
  );
}

export function GalleryForm({
  jobs,
  onSave,
}: {
  jobs: { id: string; title: string }[];
  onSave: (data: Record<string, string>) => void;
}) {
  return (
    <StudioForm onSubmit={onSave}>
      <FormSelect name="jobId" label="Choose job">
        {jobs.map((j) => (
          <option key={j.id} value={j.id}>
            {j.title}
          </option>
        ))}
      </FormSelect>
      <FormInput name="name" label="Gallery name" required={false} />
      <div className="grid grid-cols-2 gap-3">
        <FormSelect name="privacy" label="Privacy">
          <option>Private link</option>
          <option>Password</option>
          <option>Invite only</option>
        </FormSelect>
        <FormInput name="expires" label="Expires" type="date" />
      </div>
    </StudioForm>
  );
}
