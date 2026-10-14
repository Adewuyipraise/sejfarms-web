"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const INTERESTS = [
  "Aquaculture",
  "Consultancy",
  "Pond Construction",
  "Pond Leasing",
  "Training",
  "Internship",
  "Products",
  "Partnership",
  "Investment",
  "Other",
] as const;

const schema = z.object({
  interest: z.enum(INTERESTS),
  name: z.string().min(2, "Please enter your name"),
  organization: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  location: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit more"),
  consent: z.literal(true, {
        message: "Please accept to continue",
    }),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({ defaultInterest }: { defaultInterest?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      interest: (INTERESTS as readonly string[]).includes(defaultInterest ?? "")
        ? (defaultInterest as FormValues["interest"])
        : "Aquaculture",
    },
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      setServerError("Something went wrong. Please try again or WhatsApp us.");
      return;
    }
    reset();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-brand/20 bg-brand/5 p-8">
        <h3 className="font-display text-h3 font-semibold text-brand">
          Thank you — your enquiry has been sent.
        </h3>
        <p className="mt-3 text-charcoal/80">
          We'll get back to you within two business days. For faster response,
          message us on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Field label="I'm interested in" error={errors.interest?.message}>
        <select {...register("interest")} className={inputClass}>
          {INTERESTS.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input {...register("name")} className={inputClass} autoComplete="name" />
        </Field>
        <Field label="Organization" optional error={errors.organization?.message}>
          <input {...register("organization")} className={inputClass} autoComplete="organization" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register("email")} className={inputClass} autoComplete="email" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input type="tel" {...register("phone")} className={inputClass} autoComplete="tel" />
        </Field>
      </div>

      <Field label="Location" optional error={errors.location?.message}>
        <input {...register("location")} className={inputClass} />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea rows={5} {...register("message")} className={inputClass} />
      </Field>

      <label className="flex items-start gap-3 text-sm text-charcoal/80">
        <input type="checkbox" {...register("consent")} className="mt-1" />
        <span>I consent to SEJFARMS contacting me about this enquiry.</span>
      </label>
      {errors.consent && (
        <p className="text-xs text-red-600">{errors.consent.message}</p>
      )}

      {serverError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverError}</p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Submit Request"}
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