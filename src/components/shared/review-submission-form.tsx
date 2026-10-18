"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().min(2, "e.g., Intern, Student, Client"),
  institution: z.string().min(2, "School, company, or 'Individual'"),
  quote: z.string().min(20, "Please write at least a short paragraph"),
  consent: z.literal(true, {
    message: "Please accept to continue",
  }),
  honeypot: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export function ReviewSubmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const res = await fetch("/api/review-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
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
      <div className="rounded-card border border-brand/20 bg-brand/5 p-8 text-center">
        <h3 className="font-display text-h3 font-semibold text-brand">
          Thank you.
        </h3>
        <p className="mt-3 text-charcoal/80">
          Your review has been submitted for moderation. We’ll publish it once
          it’s been reviewed by our team.
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
        <Field label="Your name" error={errors.name?.message}>
          <input {...register("name")} className={inputClass} autoComplete="name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register("email")} className={inputClass} autoComplete="email" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Role" error={errors.role?.message}>
          <input
            {...register("role")}
            placeholder="e.g., Intern, Student, Client"
            className={inputClass}
          />
        </Field>
        <Field label="Institution / Organisation" error={errors.institution?.message}>
          <input
            {...register("institution")}
            placeholder="e.g., FUNAAB, JOSTUM, or 'Individual'"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Your review" error={errors.quote?.message}>
        <textarea
          rows={6}
          {...register("quote")}
          placeholder="Tell us about your experience with Sejfarms…"
          className={inputClass}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-charcoal/80">
        <input type="checkbox" {...register("consent")} className="mt-1" />
        <span>
          I consent to Sejfarms reviewing and publishing this testimonial on
          their website.
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-red-600">{errors.consent.message}</p>
      )}

      {serverError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverError}</p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Submit Review"}
      </Button>
    </form>
  );
}

const inputClass =
  "w-full rounded-button border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-charcoal">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}