"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  BotIcon,
  CartIcon,
  ChartIcon,
  CheckIcon,
  PackageIcon,
  PhoneIcon,
  WhatsAppIcon,
  ZapIcon,
} from "./icons";
import { getWhatsAppUrl, siteConfig } from "./lib/site";
import type { Locale } from "./lib/i18n/config";
import { getForm, type ProjectId } from "./lib/i18n/form";
import { AnalyticsEvent, tagSession, track } from "./lib/analytics";

type IconComponent = (props: { className?: string }) => React.ReactNode;


const iconByProject: Record<ProjectId, IconComponent> = {
  web: PhoneIcon,
  ecommerce: CartIcon,
  automation: ZapIcon,
  software: PackageIcon,
  data: ChartIcon,
  audit: BotIcon,
};

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  budget: "",
  timeline: "",
  message: "",
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function pushLeadFormEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    form: "codigofresco_lead_intake",
    ...payload,
  });

  // El dataLayer solo sirve si algún día se instala GTM; esto además manda el
  // mismo evento a GA4, Clarity y Vercel, que son las que están activas hoy.
  track(event, {
    ...(Object.fromEntries(
      Object.entries(payload).map(([key, value]) => [key, String(value)]),
    ) as Record<string, string>),
    form: "codigofresco_lead_intake",
  });
}

export function LeadIntakeSection({ lang = "es" }: { lang?: Locale }) {
  const t = getForm(lang);
  const projectOptions = t.projects.map((project) => ({ ...project, icon: iconByProject[project.id] }));
  const needOptionsByProject = t.needs;
  const budgetOptions = t.budgets;
  const timelineOptions = t.timelines;
  const [step, setStep] = useState(0);
  const [projectId, setProjectId] = useState<ProjectId | "">("");
  const [projectType, setProjectType] = useState("");
  const [need, setNeed] = useState("");
  const [website, setWebsite] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const selectedProject = projectOptions.find((option) => option.id === projectId);
  const currentNeedOptions = projectId ? needOptionsByProject[projectId] : [];
  const whatsappUrl = getWhatsAppUrl(t.whatsappMessage);

  const progress = status === "success" ? 3 : step + 1;

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!projectId || !projectType || !need) {
      setError(t.errors.step1);
      return;
    }

    if (!form.name.trim() || !form.phone.trim()) {
      setError(t.errors.step3);
      return;
    }

    if (!privacyAccepted) {
      setError(t.errors.privacy);
      return;
    }

    setStatus("submitting");
    track(AnalyticsEvent.formSubmit, {
      tipo_proyecto: projectType,
      necesidad: need,
    });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          ...form,
          projectId,
          projectType,
          need,
          website,
          sourcePath: `${window.location.pathname}${window.location.search}`,
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || t.errors.generic);
      }

      setStatus("success");
      setForm(initialForm);
      setWebsite("");
      setPrivacyAccepted(false);
      pushLeadFormEvent("lead_form_submitted", {
        projectId,
        projectType,
        need,
      });

      // `generate_lead` es el nombre estándar de GA4: al usarlo tal cual, se
      // puede marcar como evento clave (conversión) sin configuración extra y
      // sirve de objetivo para campañas de Google Ads.
      track(AnalyticsEvent.leadSuccess, {
        tipo_proyecto: projectType,
        necesidad: need,
        presupuesto: form.budget || "sin indicar",
        plazo: form.timeline || "sin indicar",
      });
      // Marca la sesión en Clarity para poder ver solo las grabaciones de
      // quienes sí convirtieron y compararlas con las que se cayeron.
      tagSession("lead", "si");
    } catch (submitError) {
      setStatus("error");
      const message =
        submitError instanceof Error
          ? submitError.message
          : t.errors.retry;
      setError(message);
      // Sin esto, un fallo del backend se ve igual que "nadie llenó el
      // formulario": tráfico que llega, cero leads y ninguna pista del porqué.
      track(AnalyticsEvent.leadError, { motivo: message.slice(0, 100) });
    }
  };

  return (
    <section id="contact" className="scroll-mt-16 bg-lime-400 px-6 py-20 text-gray-950 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-gray-800">
            {t.eyebrow}
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-900">
            {t.subtitle}
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-xl border border-lime-300/30 bg-gray-950 p-5 text-white shadow-2xl shadow-black/30 sm:p-8">
          <div
            className="mb-8 grid grid-cols-3 gap-3"
            role="progressbar"
            aria-label={t.progressAria}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={progress}
            aria-valuetext={t.progressText(progress, 3)}
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                aria-hidden="true"
                className={`h-1.5 rounded-full ${
                  item <= progress ? "bg-lime-400" : "bg-gray-800"
                }`}
              />
            ))}
          </div>

          {status === "success" ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-gray-950">
                <CheckIcon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold">{t.success.title}</h3>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-300">
                {t.success.body}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-6 py-3 font-bold text-gray-950 transition hover:bg-lime-300"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.success.whatsapp}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setProjectId("");
                    setProjectType("");
                    setNeed("");
                    setWebsite("");
                    setPrivacyAccepted(false);
                    setStep(0);
                    setStatus("idle");
                  }}
                  className="rounded-lg border border-gray-700 px-6 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-300"
                >
                  {t.success.again}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submitLead}>
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label>
                  {t.honeypotLabel}
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    name="website"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </label>
              </div>

              {step === 0 && (
                <div>
                  <h3 className="text-2xl font-bold">{t.step1.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {t.step1.hint}
                  </p>
                  <div className="mt-7 grid gap-3 md:grid-cols-2">
                    {projectOptions.map((option) => {
                      const Icon = option.icon;
                      const selected = projectId === option.id;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => {
                            setProjectId(option.id);
                            setProjectType(option.label);
                            setNeed("");
                            pushLeadFormEvent("lead_form_project_selected", {
                              projectId: option.id,
                              projectType: option.label,
                            });
                            track(AnalyticsEvent.formStart, { tipo_proyecto: option.label });
                            track(AnalyticsEvent.formStep, { paso: 2, tipo_proyecto: option.label });
                            setStep(1);
                          }}
                          className={`group min-h-28 rounded-lg border p-4 text-left transition hover:-translate-y-0.5 hover:border-lime-400 ${
                            selected
                              ? "border-lime-400 bg-lime-400/10"
                              : "border-gray-800 bg-black"
                          }`}
                        >
                          <span className="flex items-start gap-4">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-lime-400/40 bg-lime-400/10 text-lime-400">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block font-bold text-white group-hover:text-lime-200">
                                {option.label}
                              </span>
                              <span className="mt-1 block text-sm leading-6 text-gray-400">
                                {option.description}
                              </span>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 className="text-2xl font-bold">
                    {t.step2.title}
                    {selectedProject ? ` ${lang === "en" ? "for" : "en"} ${selectedProject.shortLabel}` : ""}?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {t.step2.hint}
                  </p>
                  <div className="mt-7 grid gap-3 md:grid-cols-2">
                    {currentNeedOptions.map((option) => {
                      const selected = need === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setNeed(option);
                            pushLeadFormEvent("lead_form_need_selected", {
                              projectId,
                              projectType,
                              need: option,
                            });
                            track(AnalyticsEvent.formStep, { paso: 3, necesidad: option });
                            setStep(2);
                          }}
                          className={`rounded-lg border px-4 py-4 text-left font-semibold transition hover:-translate-y-0.5 hover:border-lime-400 ${
                            selected
                              ? "border-lime-400 bg-lime-400/10 text-lime-200"
                              : "border-gray-800 bg-black text-white"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="mt-6 text-sm font-bold text-gray-400 transition hover:text-lime-300"
                  >
                    {t.step2.back}
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-2xl font-bold">{t.step3.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {t.step3.hint}
                  </p>

                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      {t.step3.name}
                      <input
                        required
                        value={form.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                        placeholder={t.step3.namePlaceholder}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      {t.step3.phone}
                      <input
                        required
                        value={form.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                        placeholder={t.step3.phonePlaceholder}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      {t.step3.company}
                      <input
                        value={form.company}
                        onChange={(event) => updateField("company", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                        placeholder={t.step3.companyPlaceholder}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      {t.step3.email}
                      <input
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                        placeholder="correo@empresa.com"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      {t.step3.budget}
                      <select
                        value={form.budget}
                        onChange={(event) => updateField("budget", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                      >
                        <option value="">{t.step3.budgetPlaceholder}</option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      {t.step3.timeline}
                      <select
                        value={form.timeline}
                        onChange={(event) => updateField("timeline", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                      >
                        <option value="">{t.step3.timelinePlaceholder}</option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300 md:col-span-2">
                      {t.step3.message}
                      <textarea
                        value={form.message}
                        onChange={(event) => updateField("message", event.target.value)}
                        className="min-h-28 rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                        placeholder={t.step3.messagePlaceholder}
                      />
                    </label>
                    <label className="flex items-start gap-3 text-sm leading-6 text-gray-300 md:col-span-2">
                      <input
                        type="checkbox"
                        required
                        checked={privacyAccepted}
                        onChange={(event) => setPrivacyAccepted(event.target.checked)}
                        className="mt-1 h-4 w-4 shrink-0 accent-lime-400"
                      />
                      <span>
                        {t.step3.privacyLead}{lang === "en" ? " " : " con la "}
                        <Link href={t.step3.privacyHref} className="font-bold text-lime-300 underline underline-offset-4">
                          {t.step3.privacyLink}
                        </Link>
                        .
                      </span>
                    </label>
                  </div>

                  {error && (
                    <p className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                      {error}
                    </p>
                  )}

                  <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="rounded-lg border border-gray-700 px-6 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-300"
                    >
                      {t.step3.back}
                    </button>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-lime-400 px-7 py-3 font-bold text-gray-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "submitting" ? t.step3.submitting : t.step3.submit}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        <p className="mt-7 text-center text-sm text-gray-900">
          {t.emailPrompt}{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-bold underline underline-offset-4">
            {t.emailFallback}
          </a>
        </p>
      </div>
    </section>
  );
}
