import { z } from "zod";
import type { Lang } from "./i18n";
import { translations } from "./i18n";
import { PACKAGES, ADDONS } from "./data";

// Localized message helper bound to a language
function msg(lang: Lang, key: string) {
  return translations[lang][key] ?? translations.en[key] ?? key;
}

export type TranslateFn = (key: string) => string;

/** Collect the first Zod error message per field path. */
export function collectErrors<T>(
  schema: z.ZodType<T>,
  data: unknown
): Record<string, string> {
  const res = schema.safeParse(data);
  if (res.success) return {};
  const errors: Record<string, string> = {};
  for (const issue of res.error.issues) {
    const path = issue.path.join(".") || "_";
    if (!errors[path]) errors[path] = issue.message;
  }
  return errors;
}

export function makePetSchema(t: TranslateFn) {
  return z.object({
    petName: z.string().min(1, t("err.petName")),
    animalType: z.enum(["dog", "cat"]),
    breed: z.string().min(1, t("err.breed")),
    age: z.coerce
      .number()
      .refine((v) => !Number.isNaN(v) && v >= 0 && v <= 40, t("err.age")),
    weight: z.coerce
      .number()
      .refine((v) => !Number.isNaN(v) && v >= 1 && v <= 120, t("err.weight")),
    gender: z.enum(["male", "female"]),
    notes: z.string().optional().or(z.literal("")),
  });
}

export function makeServiceSchema(t: TranslateFn, petType: "dog" | "cat") {
  const validPackages = PACKAGES.filter((p) => p.petType === petType).map((p) => p.id);
  return z.object({
    packageId: z
      .string()
      .min(1, t("err.package"))
      .refine((v) => validPackages.includes(v), t("err.package")),
    addonIds: z.array(z.string()).default([]),
  });
}

export function makeScheduleSchema(t: TranslateFn) {
  return z.object({
    date: z.string().min(1, t("err.date")),
    time: z.string().min(1, t("err.time")),
  });
}

export function makeOwnerSchema(t: TranslateFn) {
  return z.object({
    fullName: z.string().min(2, t("err.name")),
    phone: z
      .string()
      .min(6, t("err.phone"))
      .regex(/^[0-9+()\s-]{6,20}$/, t("err.phone")),
    whatsapp: z
      .string()
      .min(6, t("err.phone"))
      .regex(/^[0-9+()\s-]{6,20}$/, t("err.phone")),
    email: z.string().min(1, t("err.email")).email(t("err.email")),
    area: z.string().optional().or(z.literal("")),
  });
}

export const ALL_ADDON_IDS = ADDONS.map((a) => a.id);

export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

// convenience for SEO/marketing strings
export const localeMsg = msg;
