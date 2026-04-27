"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
  consent: z.literal(true, { error: "Required" }),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const subjectOptions = [
    { value: "general", label: t("f.s1") },
    { value: "partnership", label: t("f.s2") },
    { value: "media", label: t("f.s3") },
    { value: "product", label: t("f.s4") },
    { value: "other", label: t("f.s5") },
  ];

  // Strip HTML tags from the company label translation
  const companyLabel = t("f.company").replace(/<[^>]*>/g, "");

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _honey: "" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-sky-soft rounded-md p-8 text-center">
        <p className="text-lg font-semibold text-navy">{t("thanks")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot — hidden from users */}
      <input
        type="text"
        {...register("_honey" as keyof FormData)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t("f.name")}
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label={t("f.email")}
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={companyLabel}
          error={errors.company?.message}
          {...register("company")}
        />
        <Select
          label={t("f.subject")}
          options={subjectOptions}
          placeholder="—"
          error={errors.subject?.message}
          {...register("subject")}
        />
      </div>
      <Textarea
        label={t("f.message")}
        error={errors.message?.message}
        {...register("message")}
      />
      <Checkbox
        label={
          <span dangerouslySetInnerHTML={{ __html: t("f.consent") }} />
        }
        error={errors.consent?.message}
        {...register("consent")}
      />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "sending"}
      >
        {status === "sending" ? "..." : t("f.submit")}
      </Button>
    </form>
  );
}
