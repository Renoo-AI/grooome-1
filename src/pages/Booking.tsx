import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import {
  PawPrint,
  Scissors,
  CalendarDays,
  Clock,
  UserRound,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  Check,
  Dog,
  Cat,
  Mars,
  Venus,
  PartyPopper,
  Loader2,
  CalendarHeart,
  AlertCircle,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Mascot, Paw } from "@/components/PetMascot";
import { SceneDeco } from "@/components/Decor";
import {
  PACKAGES,
  ADDONS,
  SIZE_TIERS,
  tierForWeight,
  packagePrice,
  addonsForPet,
  type GroomPackage,
  type AddOn,
} from "@/lib/data";
import {
  collectErrors,
  makePetSchema,
  makeServiceSchema,
  makeOwnerSchema,
  TIME_SLOTS,
} from "@/lib/schema";
import { getBookedTimes, createBooking, type BookingResult } from "@/lib/booking";
import { cn } from "@/utils/cn";

interface FormData {
  petName: string;
  animalType: "dog" | "cat";
  breed: string;
  age: string;
  weight: string;
  gender: "male" | "female";
  notes: string;
  packageId: string;
  addonIds: string[];
  date: string;
  time: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  area: string;
}

const INITIAL: FormData = {
  petName: "",
  animalType: "dog",
  breed: "",
  age: "",
  weight: "",
  gender: "male",
  notes: "",
  packageId: "",
  addonIds: [],
  date: "",
  time: "",
  fullName: "",
  phone: "",
  whatsapp: "",
  email: "",
  area: "",
};

const STEPS = [
  { icon: PawPrint, labelKey: "book.petInfo" },
  { icon: Scissors, labelKey: "book.chooseService" },
  { icon: CalendarDays, labelKey: "book.chooseDate" },
  { icon: Clock, labelKey: "book.chooseTime" },
  { icon: UserRound, labelKey: "book.ownerInfo" },
  { icon: ClipboardCheck, labelKey: "book.review" },
] as const;

export default function BookingPage() {
  const { t, isAr, lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [booked, setBooked] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [slotError, setSlotError] = useState(false);

  const set = (patch: Partial<FormData>) => setData((d) => ({ ...d, ...patch }));

  const tier = useMemo(() => tierForWeight(Number(data.weight) || 0), [data.weight]);
  const selectedPkg = PACKAGES.find((p) => p.id === data.packageId);
  const basePrice = selectedPkg ? packagePrice(selectedPkg, tier) : 0;
  const addonsTotal = useMemo(
    () => ADDONS.filter((a) => data.addonIds.includes(a.id)).reduce((s, a) => s + a.price, 0),
    [data.addonIds]
  );
  const total = basePrice + addonsTotal;

  // fetch booked slots when date changes
  useEffect(() => {
    let active = true;
    if (data.date) {
      getBookedTimes(data.date).then((b) => active && setBooked(b));
    } else {
      setBooked([]);
    }
    return () => {
      active = false;
    };
  }, [data.date]);

  function validateCurrent(s: number): Record<string, string> {
    switch (s) {
      case 0:
        return collectErrors(makePetSchema(t), {
          petName: data.petName,
          animalType: data.animalType,
          breed: data.breed,
          age: data.age,
          weight: data.weight,
          gender: data.gender,
          notes: data.notes,
        });
      case 1:
        return collectErrors(makeServiceSchema(t, data.animalType), {
          packageId: data.packageId,
          addonIds: data.addonIds,
        });
      case 2:
        return collectErrors(z.object({ date: z.string().min(1, t("err.date")) }), { date: data.date });
      case 3:
        return collectErrors(z.object({ time: z.string().min(1, t("err.time")) }), { time: data.time });
      case 4:
        return collectErrors(makeOwnerSchema(t), {
          fullName: data.fullName,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          area: data.area,
        });
      default:
        return {};
    }
  }

  function next() {
    const errs = validateCurrent(step);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setDir(1);
    const ns = Math.min(step + 1, STEPS.length - 1);
    setStep(ns);
    setReached((r) => Math.max(r, ns));
    setSlotError(false);
  }
  function back() {
    setDir(-1);
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  }
  function gotoStep(i: number) {
    if (i <= reached) {
      setDir(i < step ? -1 : 1);
      setStep(i);
      setErrors({});
    }
  }

  async function confirm() {
    setSubmitting(true);
    setSlotError(false);
    try {
      const res = await createBooking({
        customer: { name: data.fullName, phone: data.phone, whatsapp: data.whatsapp, email: data.email, area: data.area },
        pet: { name: data.petName, type: data.animalType, breed: data.breed, age: data.age, weight: data.weight, gender: data.gender, notes: data.notes },
        service: {
          packageId: data.packageId,
          packageName: selectedPkg ? (isAr ? selectedPkg.nameAr : selectedPkg.name) : "",
          addonIds: data.addonIds,
          addonNames: ADDONS.filter((a) => data.addonIds.includes(a.id)).map((a) => (isAr ? a.nameAr : a.name)),
        },
        schedule: { date: data.date, time: data.time },
        total,
      });
      setResult(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      if ((e as Error).message === "SLOT_TAKEN") {
        setSlotError(true);
        setStep(3);
        setBooked((b) => (b.includes(data.time) ? b : [...b, data.time]));
      }
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setData(INITIAL);
    setStep(0);
    setReached(0);
    setErrors({});
    setResult(null);
    setSlotError(false);
  }

  if (result) return <Success result={result} data={data} selectedPkg={selectedPkg} total={total} onReset={reset} />;

  return (
    <div className="px-5 pb-10 pt-6">
      <SceneDeco density="light" />
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="text-center">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-maroon shadow-soft">
            <CalendarHeart className="h-4 w-4" />
            {t("book.eyebrow")}
          </span>
          <h1 className="mt-4 font-display text-4xl font-700 text-ink sm:text-5xl">{t("book.title")}</h1>
          <p className="mx-auto mt-3 max-w-xl font-semibold text-ink/60">{t("book.subtitle")}</p>
        </div>

        {/* stepper */}
        <div className="no-scrollbar mt-8 overflow-x-auto">
          <ol className="mx-auto flex min-w-max justify-center gap-1.5 sm:gap-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = i === step;
              const done = i < step;
              const clickable = i <= reached;
              return (
                <li key={s.labelKey}>
                  <button
                    onClick={() => gotoStep(i)}
                    disabled={!clickable}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-700 transition-all",
                      active ? "bg-maroon text-white shadow-soft" : done ? "bg-white text-pine shadow-soft" : "bg-white/50 text-ink/40",
                      clickable ? "cursor-pointer hover:scale-105" : "cursor-default"
                    )}
                  >
                    <span className={cn("grid h-7 w-7 place-items-center rounded-full", active ? "bg-white/20" : done ? "bg-pine-soft" : "bg-ink/5")}>
                      {done ? <Check className="h-4 w-4" strokeWidth={3} /> : <Icon className="h-4 w-4" />}
                    </span>
                    <span className="hidden sm:inline">{t(s.labelKey)}</span>
                    <span className="sm:hidden">{i + 1}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* content + summary */}
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.55fr_1fr]">
          <div className="card-bubble min-h-[26rem] p-5 sm:p-7">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                initial={{ opacity: 0, x: dir * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -24 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && (
                  <StepPet data={data} set={set} errors={errors} t={t} isAr={isAr} />
                )}
                {step === 1 && (
                  <StepService
                    data={data}
                    set={set}
                    errors={errors}
                    tier={tier}
                    tierLabel={SIZE_TIERS.find((s) => s.id === tier)?.[isAr ? "labelAr" : "label"] ?? ""}
                    t={t}
                    isAr={isAr}
                  />
                )}
                {step === 2 && <StepDate data={data} set={set} error={errors.date} t={t} isAr={isAr} />}
                {step === 3 && (
                  <StepTime data={data} set={set} error={errors.time} booked={booked} slotError={slotError} t={t} isAr={isAr} />
                )}
                {step === 4 && <StepOwner data={data} set={set} errors={errors} t={t} />}
                {step === 5 && (
                  <StepReview data={data} selectedPkg={selectedPkg} total={total} tier={tier} t={t} isAr={isAr} lang={lang} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* nav */}
            <div className="mt-7 flex items-center justify-between gap-3 border-t border-ink/8 pt-5">
              <button onClick={back} disabled={step === 0} className={cn("btn btn-ghost", step === 0 && "invisible")}>
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                {t("book.back")}
              </button>

              {step < STEPS.length - 1 ? (
                <button onClick={next} className="btn btn-primary">
                  {t("book.next")}
                  <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              ) : (
                <button onClick={confirm} disabled={submitting} className="btn btn-primary">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <PartyPopper className="h-4 w-4" />}
                  {t("book.confirm")}
                </button>
              )}
            </div>
          </div>

          {/* summary */}
          <aside className="lg:sticky lg:top-24">
            <SummaryCard data={data} selectedPkg={selectedPkg} basePrice={basePrice} addonsTotal={addonsTotal} total={total} t={t} isAr={isAr} lang={lang} />
          </aside>
        </div>
      </div>
    </div>
  );
}

/* =================== STEP 1: PET =================== */
function StepPet({
  data,
  set,
  errors,
  t,
  isAr,
}: {
  data: FormData;
  set: (p: Partial<FormData>) => void;
  errors: Record<string, string>;
  t: (k: string) => string;
  isAr: boolean;
}) {
  return (
    <div>
      <StepTitle icon={PawPrint} title={t("book.petInfo")} />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label={t("book.petName")} error={errors.petName} required>
          <input className="input" placeholder={t("book.petNamePh")} value={data.petName} onChange={(e) => set({ petName: e.target.value })} />
        </Field>

        <Field label={t("book.animalType")} required>
          <div className="grid grid-cols-2 gap-2">
            <Segment active={data.animalType === "dog"} onClick={() => set({ animalType: "dog", packageId: "" })} tone="maroon">
              <Dog className="h-5 w-5" /> {t("book.dog")}
            </Segment>
            <Segment active={data.animalType === "cat"} onClick={() => set({ animalType: "cat", packageId: "" })} tone="pine">
              <Cat className="h-5 w-5" /> {t("book.cat")}
            </Segment>
          </div>
        </Field>

        <Field label={t("book.breed")} error={errors.breed} required>
          <input className="input" placeholder={t("book.breedPh")} value={data.breed} onChange={(e) => set({ breed: e.target.value })} />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label={t("book.age")} error={errors.age}>
            <input type="number" min={0} max={40} className="input" placeholder={t("book.agePh")} value={data.age} onChange={(e) => set({ age: e.target.value })} />
          </Field>
          <Field label={t("book.weight")} error={errors.weight}>
            <input type="number" min={1} max={120} className="input" placeholder={t("book.weightPh")} value={data.weight} onChange={(e) => set({ weight: e.target.value })} />
          </Field>
        </div>

        <Field label={t("book.gender")}>
          <div className="grid grid-cols-2 gap-2">
            <Segment active={data.gender === "male"} onClick={() => set({ gender: "male" })} tone="maroon">
              <Mars className="h-5 w-5" /> {t("book.male")}
            </Segment>
            <Segment active={data.gender === "female"} onClick={() => set({ gender: "female" })} tone="pine">
              <Venus className="h-5 w-5" /> {t("book.female")}
            </Segment>
          </div>
        </Field>

        <div className="sm:col-span-2">
          <Field label={t("book.notes")}>
            <textarea className="input min-h-[88px] resize-y" placeholder={t("book.notesPh")} value={data.notes} onChange={(e) => set({ notes: e.target.value })} />
          </Field>
        </div>
      </div>
      {isAr ? null : null}
    </div>
  );
}

/* =================== STEP 2: SERVICE =================== */
function StepService({
  data,
  set,
  errors,
  tier,
  tierLabel,
  t,
  isAr,
}: {
  data: FormData;
  set: (p: Partial<FormData>) => void;
  errors: Record<string, string>;
  tier: string;
  tierLabel: string;
  t: (k: string) => string;
  isAr: boolean;
}) {
  const packages = PACKAGES.filter((p) => p.petType === data.animalType);
  const addons = addonsForPet(data.animalType);

  const toggleAddon = (id: string) =>
    set({ addonIds: data.addonIds.includes(id) ? data.addonIds.filter((a) => a !== id) : [...data.addonIds, id] });

  return (
    <div>
      <StepTitle icon={Scissors} title={t("book.chooseService")} />
      {data.animalType === "dog" && (
        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-aqua-soft px-3 py-1.5 text-sm font-bold text-aqua-deep">
          <Sparkles className="h-4 w-4" />
          {t("book.sizeDetected")}: <span className="text-maroon">{tierLabel || "—"}</span>
        </div>
      )}
      {errors.packageId && <p className="mt-2 text-sm font-bold text-maroon">{errors.packageId}</p>}

      <p className="mt-5 font-display text-lg font-700 text-ink">{t("book.pickPackage")}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {packages.map((p) => (
          <PackageOption key={p.id} pkg={p} selected={data.packageId === p.id} price={packagePrice(p, tier as any)} onSelect={() => set({ packageId: p.id })} t={t} isAr={isAr} />
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between">
        <p className="font-display text-lg font-700 text-ink">{t("book.pickAddons")}</p>
        {data.addonIds.length > 0 && (
          <button onClick={() => set({ addonIds: [] })} className="text-sm font-bold text-maroon hover:underline">
            {isAr ? "مسح الكل" : "Clear"}
          </button>
        )}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {addons.map((a) => (
          <AddonOption key={a.id} addon={a} selected={data.addonIds.includes(a.id)} onToggle={() => toggleAddon(a.id)} t={t} isAr={isAr} />
        ))}
      </div>
    </div>
  );
}

/* =================== STEP 3: DATE =================== */
function StepDate({ data, set, error, t, isAr }: { data: FormData; set: (p: Partial<FormData>) => void; error?: string; t: (k: string) => string; isAr: boolean }) {
  return (
    <div>
      <StepTitle icon={CalendarDays} title={t("book.chooseDate")} />
      <p className="mt-2 font-semibold text-ink/55">{t("book.pickDateNote")}</p>
      {error && <p className="mt-2 text-sm font-bold text-maroon">{error}</p>}
      <div className="mt-4">
        <Calendar value={data.date} onChange={(d) => set({ date: d, time: "" })} isAr={isAr} t={t} />
      </div>
    </div>
  );
}

/* =================== STEP 4: TIME =================== */
function StepTime({
  data,
  set,
  error,
  booked,
  slotError,
  t,
  isAr,
}: {
  data: FormData;
  set: (p: Partial<FormData>) => void;
  error?: string;
  booked: string[];
  slotError: boolean;
  t: (k: string) => string;
  isAr: boolean;
}) {
  return (
    <div>
      <StepTitle icon={Clock} title={t("book.chooseTime")} />
      <p className="mt-2 font-semibold text-ink/55">{t("book.pickTimeNote")}</p>
      {slotError && (
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-maroon-soft px-4 py-3 text-sm font-bold text-maroon">
          <AlertCircle className="h-4 w-4" />
          {isAr ? "هذا الموعد لم يعد متاحًا، يرجى اختيار وقت آخر." : "That slot was just taken — please pick another time."}
        </div>
      )}
      {error && <p className="mt-2 text-sm font-bold text-maroon">{error}</p>}
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {TIME_SLOTS.map((slot) => {
          const isBooked = booked.includes(slot);
          const active = data.time === slot;
          return (
            <button
              key={slot}
              disabled={isBooked}
              onClick={() => set({ time: slot })}
              className={cn(
                "rounded-2xl border-2 px-3 py-4 font-display text-lg font-700 transition-all",
                active ? "border-maroon bg-maroon text-white shadow-soft" : isBooked ? "cursor-not-allowed border-ink/8 bg-ink/5 text-ink/30 line-through" : "border-transparent bg-white text-ink hover:border-maroon hover:-translate-y-0.5"
              )}
            >
              {slot}
              {isBooked && <span className="block text-[0.6rem] font-bold not-italic">{t("book.booked")}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =================== STEP 5: OWNER =================== */
function StepOwner({ data, set, errors, t }: { data: FormData; set: (p: Partial<FormData>) => void; errors: Record<string, string>; t: (k: string) => string }) {
  return (
    <div>
      <StepTitle icon={UserRound} title={t("book.ownerInfo")} />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label={t("book.fullName")} error={errors.fullName} required>
          <input className="input" placeholder={t("book.fullNamePh")} value={data.fullName} onChange={(e) => set({ fullName: e.target.value })} />
        </Field>
        <Field label={t("book.phone")} error={errors.phone} required>
          <input className="input" inputMode="tel" placeholder={t("book.phonePh")} value={data.phone} onChange={(e) => set({ phone: e.target.value })} />
        </Field>
        <Field label={t("book.whatsapp")} error={errors.whatsapp} required>
          <input className="input" inputMode="tel" placeholder={t("book.whatsappPh")} value={data.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} />
        </Field>
        <Field label={t("book.email")} error={errors.email} required>
          <input className="input" type="email" inputMode="email" placeholder={t("book.emailPh")} value={data.email} onChange={(e) => set({ email: e.target.value })} />
        </Field>
        <div className="sm:col-span-2">
          <Field label={t("book.area")}>
            <input className="input" placeholder={t("book.areaPh")} value={data.area} onChange={(e) => set({ area: e.target.value })} />
            <p className="mt-1.5 text-xs font-bold text-ink/45">{t("book.areaNote")}</p>
          </Field>
        </div>
      </div>
    </div>
  );
}

/* =================== STEP 6: REVIEW =================== */
function StepReview({
  data,
  selectedPkg,
  total,
  tier,
  t,
  isAr,
  lang,
}: {
  data: FormData;
  selectedPkg?: GroomPackage;
  total: number;
  tier: string;
  t: (k: string) => string;
  isAr: boolean;
  lang: "en" | "ar";
}) {
  const addons = ADDONS.filter((a) => data.addonIds.includes(a.id));
  const fmt = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(lang === "ar" ? "ar-QA" : "en-GB", { weekday: "long", day: "numeric", month: "long" }).format(new Date(iso));
    } catch {
      return iso;
    }
  };
  return (
    <div>
      <StepTitle icon={ClipboardCheck} title={t("book.review")} />
      <p className="mt-2 font-semibold text-ink/55">{t("book.reviewSub")}</p>
      <div className="mt-5 space-y-3">
        <ReviewRow icon={PawPrint} label={t("book.pet")}>
          <strong>{data.petName}</strong> · {data.animalType === "dog" ? t("book.dog") : t("book.cat")} · {data.breed} · {data.weight} kg
        </ReviewRow>
        <ReviewRow icon={Scissors} label={t("book.service")}>
          <strong>{selectedPkg ? (isAr ? selectedPkg.nameAr : selectedPkg.name) : "—"}</strong>
          {addons.length > 0 && <span className="block text-sm text-ink/60">+ {addons.map((a) => (isAr ? a.nameAr : a.name)).join(", ")}</span>}
        </ReviewRow>
        <ReviewRow icon={CalendarDays} label={t("book.when")}>
          <strong>{data.date ? fmt(data.date) : "—"}</strong> · {data.time}
        </ReviewRow>
        <ReviewRow icon={UserRound} label={t("book.owner")}>
          <strong>{data.fullName}</strong> · {data.phone} {data.area ? `· ${data.area}` : ""}
        </ReviewRow>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-2xl bg-maroon px-5 py-4 text-white">
        <span className="font-display text-lg font-700">{t("book.total")}</span>
        <span className="font-display text-3xl font-700">{total} {t("common.qar")}</span>
      </div>
      <p className="mt-3 text-center text-xs font-bold text-ink/45">
        <Sparkles className="mr-1 inline h-3.5 w-3.5 text-honey" />
        {isAr ? `حجم مكتشف: ${SIZE_TIERS.find((s) => s.id === tier)?.labelAr ?? ""}` : `Detected size: ${SIZE_TIERS.find((s) => s.id === tier)?.label ?? ""}`}
      </p>
    </div>
  );
}

/* =================== SUMMARY CARD =================== */
function SummaryCard({
  data,
  selectedPkg,
  basePrice,
  addonsTotal,
  total,
  t,
  isAr,
  lang,
}: {
  data: FormData;
  selectedPkg?: GroomPackage;
  basePrice: number;
  addonsTotal: number;
  total: number;
  t: (k: string) => string;
  isAr: boolean;
  lang: "en" | "ar";
}) {
  const fmt = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(lang === "ar" ? "ar-QA" : "en-GB", { day: "numeric", month: "short" }).format(new Date(iso));
    } catch {
      return iso;
    }
  };
  const rows = [
    { label: selectedPkg ? (isAr ? selectedPkg.nameAr : selectedPkg.name) : t("book.mainPackage"), value: basePrice ? `${basePrice} ${t("common.qar")}` : "—" },
    { label: `${t("book.addons")} (${data.addonIds.length})`, value: addonsTotal ? `${addonsTotal} ${t("common.qar")}` : t("book.none") },
  ];
  return (
    <div className="card-bubble overflow-hidden">
      <div className="flex items-center gap-2 bg-maroon px-5 py-4 text-white">
        <Sparkles className="h-5 w-5 text-honey" />
        <span className="font-display text-lg font-700">{t("book.summary")}</span>
      </div>
      <div className="space-y-3 p-5">
        {data.petName && (
          <div className="flex items-center gap-2 rounded-2xl bg-aqua-soft px-3 py-2 text-sm font-bold text-ink">
            <PawPrint className="h-4 w-4 text-aqua-deep" /> {data.petName} {data.animalType === "dog" ? "🐶" : "🐱"}
          </div>
        )}
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3 border-b border-dashed border-ink/10 pb-2 text-sm">
            <span className="font-bold text-ink/60">{r.label}</span>
            <span className="font-display font-700 text-ink">{r.value}</span>
          </div>
        ))}
        {(data.date || data.time) && (
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-bold text-ink/60">{t("book.when")}</span>
            <span className="font-display font-700 text-ink">{data.date ? fmt(data.date) : "—"} · {data.time || "—"}</span>
          </div>
        )}
        <div className="flex items-end justify-between rounded-2xl bg-pine-soft px-4 py-3">
          <span className="font-display font-700 text-pine">{t("book.total")}</span>
          <span className="font-display text-2xl font-700 text-pine">{total} <span className="text-sm">{t("common.qar")}</span></span>
        </div>
        <Link to="/services" className="block text-center text-sm font-bold text-maroon hover:underline">
          {t("services.cta")} →
        </Link>
      </div>
    </div>
  );
}

/* =================== SUCCESS =================== */
function Success({
  result,
  data,
  selectedPkg,
  total,
  onReset,
}: {
  result: BookingResult;
  data: FormData;
  selectedPkg?: GroomPackage;
  total: number;
  onReset: () => void;
}) {
  const { t, isAr } = useLanguage();
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-16">
      {/* confetti paws */}
      {Array.from({ length: 14 }).map((_, i) => (
        <Paw
          key={i}
          className={cn("absolute fill-maroon/40", i % 3 === 0 && "fill-honey", i % 3 === 1 && "fill-pine/50")}
          style={{
            left: `${(i * 7 + 6) % 100}%`,
            top: "-10%",
            width: `${20 + (i % 4) * 10}px`,
            animation: `fall ${3 + (i % 5) * 0.5}s linear ${(i % 7) * 0.3}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes fall{to{transform:translateY(110vh) rotate(360deg)}}`}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="card-bubble relative z-10 w-full max-w-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 12 }}
          className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-pine text-white shadow-pop"
        >
          <Check className="h-12 w-12" strokeWidth={3} />
        </motion.div>

        <div className="mt-5 flex justify-center">
          <Mascot variant="dog" className="h-20 w-20" />
        </div>

        <h2 className="mt-4 font-display text-3xl font-700 text-ink">{t("book.confirmed")}</h2>
        <p className="mt-1 font-semibold text-ink/60">{t("book.confirmedSub")}</p>

        <div className="mt-5 rounded-2xl bg-aqua-soft px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wide text-ink/45">{t("book.bookingNo")}</p>
          <p className="font-display text-3xl font-700 text-maroon">{result.bookingNumber}</p>
        </div>

        <div className="mt-4 space-y-1.5 text-start text-sm font-semibold text-ink/65">
          <p>🐾 {data.petName} · {selectedPkg ? (isAr ? selectedPkg.nameAr : selectedPkg.name) : ""}</p>
          <p>📅 {data.date} · {data.time}</p>
          <p>💰 {t("book.total")}: <span className="text-maroon">{total} {t("common.qar")}</span></p>
        </div>

        <p className="mt-4 rounded-2xl bg-white/60 px-4 py-3 text-sm font-semibold text-ink/60">
          {t("book.doneMsg")}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={onReset} className="btn btn-secondary">
            <RotateCcw className="h-4 w-4" />
            {t("book.bookAnother")}
          </button>
          <Link to="/" className="btn btn-primary">
            {t("nav.home")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* =================== SHARED BITS =================== */
function StepTitle({ icon: Icon, title }: { icon: typeof PawPrint; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-maroon-soft text-maroon">
        <Icon className="h-6 w-6" />
      </span>
      <h2 className="font-display text-2xl font-700 text-ink">{title}</h2>
    </div>
  );
}

function Field({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="field-label flex items-center gap-1">
        {label} {required && <span className="text-maroon">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-sm font-bold text-maroon">{error}</p>}
    </label>
  );
}

function Segment({ active, onClick, tone, children }: { active: boolean; onClick: () => void; tone: "maroon" | "pine"; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2.5 font-display text-sm font-700 transition-all",
        active ? (tone === "maroon" ? "border-maroon bg-maroon text-white" : "border-pine bg-pine text-white") : "border-ink/10 bg-white text-ink/60 hover:border-ink/30"
      )}
    >
      {children}
    </button>
  );
}

function PackageOption({
  pkg,
  selected,
  price,
  onSelect,
  t,
  isAr,
}: {
  pkg: GroomPackage;
  selected: boolean;
  price: number;
  onSelect: () => void;
  t: (k: string) => string;
  isAr: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex h-full flex-col rounded-2xl border-2 p-4 text-start transition-all",
        selected ? "border-maroon bg-maroon/5 shadow-soft" : "border-ink/10 bg-white hover:border-maroon/40"
      )}
    >
      {pkg.popular && <span className="absolute -top-2.5 right-3 rounded-full bg-honey px-2 py-0.5 text-[0.6rem] font-bold text-white">{t("common.popular")}</span>}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display font-700 text-ink">{isAr ? pkg.nameAr : pkg.name}</p>
          <p dir="rtl" className="text-xs font-bold text-pine">{pkg.arabicTag}</p>
        </div>
        <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full border-2", selected ? "border-maroon bg-maroon text-white" : "border-ink/20")}>
          {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
      </div>
      <ul className="mt-2 space-y-1">
        {(isAr ? pkg.featuresAr : pkg.features).slice(0, 3).map((f) => (
          <li key={f} className="flex items-center gap-1.5 text-xs font-bold text-ink/55">
            <Check className="h-3 w-3 text-pine" strokeWidth={3} /> {f}
          </li>
        ))}
      </ul>
      <p className="mt-3 font-display text-xl font-700 text-maroon">
        {price} <span className="text-sm">{t("common.qar")}</span>
      </p>
    </button>
  );
}

function AddonOption({ addon, selected, onToggle, t, isAr }: { addon: AddOn; selected: boolean; onToggle: () => void; t: (k: string) => string; isAr: boolean }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center justify-between gap-2 rounded-2xl border-2 px-3.5 py-3 text-start transition-all",
        selected ? "border-pine bg-pine-soft" : "border-ink/10 bg-white hover:border-pine/40"
      )}
    >
      <span className="flex items-center gap-2.5">
        <span className={cn("grid h-5 w-5 place-items-center rounded-md border-2", selected ? "border-pine bg-pine text-white" : "border-ink/25")}>
          {selected && <Check className="h-3 w-3" strokeWidth={3} />}
        </span>
        <span className="font-display text-sm font-700 text-ink">{isAr ? addon.nameAr : addon.name}</span>
      </span>
      <span className="font-display text-sm font-700 text-maroon">+{addon.price} {t("common.qar")}</span>
    </button>
  );
}

function ReviewRow({ icon: Icon, label, children }: { icon: typeof PawPrint; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/60 p-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-maroon-soft text-maroon">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-ink/40">{label}</p>
        <p className="font-body font-semibold text-ink/75">{children}</p>
      </div>
    </div>
  );
}

/* =================== CALENDAR =================== */
function Calendar({ value, onChange, isAr, t }: { value: string; onChange: (iso: string) => void; isAr: boolean; t: (k: string) => string }) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });

  const months = isAr
    ? ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekdays = isAr ? ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const first = new Date(view.y, view.m, 1);
  const lead = first.getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(view.y, view.m, d));

  const isoOf = (dt: Date) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  const isDisabled = (dt: Date) => {
    const dd = new Date(dt);
    dd.setHours(0, 0, 0, 0);
    return dd < today || dd.getDay() === 5; // closed Fridays
  };
  const canPrev = view.y > today.getFullYear() || (view.y === today.getFullYear() && view.m > today.getMonth());

  return (
    <div className="rounded-3xl border-2 border-ink/8 bg-white p-4">
      <div className="flex items-center justify-between">
        <button onClick={() => canPrev && setView((v) => dec(v))} disabled={!canPrev} className={cn("grid h-9 w-9 place-items-center rounded-full bg-maroon-soft text-maroon", !canPrev && "opacity-30")}>
          <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
        </button>
        <p className="font-display text-lg font-700 text-ink">{months[view.m]} {view.y}</p>
        <button onClick={() => setView((v) => inc(v))} className="grid h-9 w-9 place-items-center rounded-full bg-maroon-soft text-maroon">
          <ChevronRight className="h-5 w-5 rtl:rotate-180" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-bold text-ink/40">
        {weekdays.map((w) => (
          <span key={w} className="py-1">{w}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((dt, i) => {
          if (!dt) return <span key={`e${i}`} />;
          const iso = isoOf(dt);
          const disabled = isDisabled(dt);
          const active = value === iso;
          return (
            <button
              key={iso}
              disabled={disabled}
              onClick={() => onChange(iso)}
              className={cn(
                "aspect-square rounded-xl font-display text-sm font-700 transition-all",
                active ? "bg-maroon text-white shadow-soft" : disabled ? "text-ink/20 line-through" : "bg-ink/[0.03] text-ink hover:bg-maroon/10 hover:-translate-y-0.5"
              )}
            >
              {dt.getDate()}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs font-bold text-ink/40">📍 {t("book.pickDateNote")}</p>
    </div>
  );
}

function inc(v: { y: number; m: number }) {
  return v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 };
}
function dec(v: { y: number; m: number }) {
  return v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 };
}
