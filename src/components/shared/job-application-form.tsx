"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  location: z.string().min(2, "Please tell us where you're based"),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  message: z.string().min(20, "Please tell us why you're a good fit"),
  consent: z.literal(true, { message: "Please accept to continue" }),
  honeypot: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export function JobApplicationForm({
  jobSlug,
  jobTitle,
}: {
  jobSlug: string;
  jobTitle: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const res = await fetch("/api/application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, jobSlug, jobTitle }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setServerError(body.error ?? "Something went wrong. Please try again.");
      return;
    }
    reset();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-brand/20 bg-brand/5 p-8">
        <h3 className="font-display text-h3 font-semibold text-brand">
          Application received.
        </h3>
        <p className="mt-3 text-charcoal/80">
          Thank you for applying for {jobTitle}. We'll review your application
          and be in touch if you're shortlisted.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <input
        type="text"
        {...register("honeypot")}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input {...register("name")} className={inputClass} autoComplete="name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register("email")} className={inputClass} autoComplete="email" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message}>
          <input type="tel" {...register("phone")} className={inputClass} autoComplete="tel" />
        </Field>
        <Field label="Location" error={errors.location?.message}>
          <input {...register("location")} className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="LinkedIn" optional error={errors.linkedin?.message}>
          <input {...register("linkedin")} className={inputClass} />
        </Field>
        <Field label="Portfolio / CV link" optional error={errors.portfolio?.message}>
          <input {...register("portfolio")} className={inputClass} />
        </Field>
      </div>

      <Field label="Why are you a good fit?" error={errors.message?.message}>
        <textarea rows={6} {...register("message")} className={inputClass} />
      </Field>

      <label className="flex items-start gap-3 text-sm text-charcoal/80">
        <input type="checkbox" {...register("consent")} className="mt-1" />
        <span>
          I consent to Sejfarms storing this application for the purpose of
          assessing my suitability for the role.
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-red-600">{errors.consent.message}</p>
      )}

      {serverError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverError}</p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit Application"}
      </Button>
    </form>
  );
}

const inputClass =
  "w-full rounded-button border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand";

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-charcoal">
        {label}
        {optional && <span className="ml-1 text-xs font-normal text-muted">(optional)</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}