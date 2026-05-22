"use client";

import { CheckCircle2, Clock, ShieldCheck, Upload } from "lucide-react";
import { useStudio } from "@/hooks/use-studio";
import type { StudioSettings } from "@/lib/mock/studio.types";
import { StudioCard, StudioCardHead } from "../studio-card";

function SettingsField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 w-full rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-200"
        style={{ borderColor: "var(--lineage-line)" }}
      />
    </label>
  );
}

function SettingsToggle({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex w-full items-center justify-between rounded-xl border p-4 text-left"
      style={{ borderColor: "var(--lineage-line)" }}
    >
      <span className="flex items-center gap-3">
        <Icon size={17} />
        <b className="text-sm">{label}</b>
      </span>
      <span
        className={`h-6 w-11 rounded-full p-1 ${value ? "bg-black" : "bg-slate-200"}`}
      >
        <span
          className={`block h-4 w-4 rounded-full bg-white transition ${value ? "translate-x-5" : ""}`}
        />
      </span>
    </button>
  );
}

export function SettingsView() {
  const { settings, updateSettings } = useStudio();

  const set = <K extends keyof StudioSettings>(
    key: K,
    value: StudioSettings[K],
  ) => {
    updateSettings((s) => ({ ...s, [key]: value }));
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <StudioCard wide className="lg:col-span-2">
        <StudioCardHead title="Studio defaults" />
        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
          <SettingsField
            label="Studio name"
            value={settings.studio}
            onChange={(v) => set("studio", v)}
          />
          <SettingsField
            label="Client reply email"
            value={settings.email}
            onChange={(v) => set("email", v)}
          />
          <SettingsField
            label="Watermark text"
            value={settings.watermarkText}
            onChange={(v) => set("watermarkText", v)}
          />
          <SettingsField
            label="Gallery expiry days"
            type="number"
            value={settings.expiry}
            onChange={(v) => set("expiry", Number(v))}
          />
          <SettingsField
            label="Default privacy"
            value={settings.defaultPrivacy}
            onChange={(v) => set("defaultPrivacy", v)}
          />
          <SettingsField
            label="Brand style"
            value={settings.brand}
            onChange={(v) => set("brand", v)}
          />
        </div>
      </StudioCard>
      <StudioCard>
        <StudioCardHead title="Controls" />
        <div className="space-y-3 p-5">
          <SettingsToggle
            icon={ShieldCheck}
            label="Apply watermark"
            value={settings.watermark}
            onChange={(v) => set("watermark", v)}
          />
          <SettingsToggle
            icon={Upload}
            label="Allow downloads"
            value={settings.download}
            onChange={(v) => set("download", v)}
          />
          <SettingsToggle
            icon={Clock}
            label="Delivery reminders"
            value={settings.notify}
            onChange={(v) => set("notify", v)}
          />
        </div>
      </StudioCard>
      <StudioCard wide className="lg:col-span-3">
        <StudioCardHead title="Recommended studio settings" />
        <div className="grid grid-cols-1 gap-4 p-5 text-sm md:grid-cols-3">
          {[
            "Private links by default",
            "Gallery expiration dates",
            "Watermark preview before sharing",
            "Client download toggle",
            "Delivery reminder emails",
            "Simple job statuses only",
          ].map((x) => (
            <div
              key={x}
              className="flex gap-3 rounded-xl border p-4"
              style={{ borderColor: "var(--lineage-line)" }}
            >
              <CheckCircle2
                size={18}
                style={{ color: "var(--lineage-gold)" }}
              />
              <span>{x}</span>
            </div>
          ))}
        </div>
      </StudioCard>
    </div>
  );
}
