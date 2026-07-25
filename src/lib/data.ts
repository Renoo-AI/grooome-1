// ============================================================
// GROOMME QATAR — SERVICES & PRICING DATA (all prices in QAR)
// ============================================================

export type PetType = "dog" | "cat";
export type SizeTier = "small" | "medium" | "large" | "xlarge";

export interface SizeInfo {
  id: SizeTier;
  label: string;
  labelAr: string;
  weight: string;
  weightAr: string;
  range: [number, number]; // [min, max] kg — xlarge max = Infinity
}

export const SIZE_TIERS: SizeInfo[] = [
  { id: "small", label: "Small", labelAr: "صغير", weight: "1–7 kg", weightAr: "1–7 كجم", range: [1, 7] },
  { id: "medium", label: "Medium", labelAr: "متوسط", weight: "8–16 kg", weightAr: "8–16 كجم", range: [8, 16] },
  { id: "large", label: "Large", labelAr: "كبير", weight: "17–24 kg", weightAr: "17–24 كجم", range: [17, 24] },
  { id: "xlarge", label: "X-Large", labelAr: "ضخم", weight: "Above 24 kg", weightAr: "أكثر من 24 كجم", range: [25, Infinity] },
];

export function tierForWeight(weight: number): SizeTier {
  const w = Math.max(0, Number(weight) || 0);
  const tier = SIZE_TIERS.find((t) => w >= t.range[0] && w <= t.range[1]);
  return tier ? tier.id : "small";
}

export interface GroomPackage {
  id: string;
  name: string;
  nameAr: string;
  arabicTag: string; // native label e.g. "غسيل عادي"
  desc: string;
  descAr: string;
  petType: PetType;
  pricing: "bySize" | "flat";
  price?: number;
  priceBySize?: Record<SizeTier, number>;
  features: string[];
  featuresAr: string[];
  popular?: boolean;
  accent: "maroon" | "pine" | "honey" | "aqua";
}

export const PACKAGES: GroomPackage[] = [
  {
    id: "dog_basic",
    name: "Dog Basic Grooming",
    nameAr: "تنظيف أساسي للكلاب",
    arabicTag: "غسيل عادي",
    desc: "A refreshing bath, gentle brush-out, nail check and a tidy finish to keep your pup clean and happy.",
    descAr: "حمام منعش، وتسريح لطيف، وفحص للأظافر ولمسة نهائية مرتبة لإبقاء جروك نظيفًا وسعيدًا.",
    petType: "dog",
    pricing: "bySize",
    priceBySize: { small: 250, medium: 280, large: 300, xlarge: 340 },
    features: ["Warm bath & shampoo", "Brush & blow dry", "Ear & eye cleaning", "Nail check"],
    featuresAr: ["حمام دافئ وشامبو", "تسريخ وتجفيف", "تنظيف الأذن والعين", "فحص الأظافر"],
    accent: "aqua",
  } as GroomPackage,
  {
    id: "dog_full",
    name: "Dog Full Grooming",
    nameAr: "تنظيف كامل للكلاب",
    arabicTag: "غسيل كامل",
    desc: "The complete pamper — bath, full haircut, styling, and detailed finishing for a picture-perfect pup.",
    descAr: "العناية الكاملة — حمام، قص شعر كامل، وتنسيق وتشطيل مفصّل لإطلالة مثالية لجروك.",
    petType: "dog",
    pricing: "bySize",
    priceBySize: { small: 320, medium: 350, large: 380, xlarge: 400 },
    features: ["Everything in Basic", "Full breed haircut", "Styling & finishing", "Premium scented spritz"],
    featuresAr: ["كل ما في الباقة الأساسية", "قص كامل حسب السلالة", "تنسيق وتشطيل", "بخاخ معطر فاخر"],
    popular: true,
    accent: "maroon",
  },
  {
    id: "cat_basic",
    name: "Cat Basic Grooming",
    nameAr: "تنظيف أساسي للقطط",
    arabicTag: "غسيل عادي",
    desc: "A calm, gentle groom crafted for cats — bath, brush and a tidy finish in a stress-free way.",
    descAr: "تنظيف هادئ ولطيف مصمم للقطط — حمام وتسريح ولمسة نهائية مرتبة بأسلوب خالٍ من التوتر.",
    petType: "cat",
    pricing: "flat",
    price: 250,
    features: ["Warm bath & shampoo", "Gentle brush-out", "Ear & eye cleaning", "Nail check"],
    featuresAr: ["حمام دافئ وشامبو", "تسريح لطيف", "تنظيف الأذن والعين", "فحص الأظافر"],
    accent: "pine",
  },
  {
    id: "cat_full",
    name: "Cat Full Grooming",
    nameAr: "تنظيف كامل للقطط",
    arabicTag: "غسيل كامل",
    desc: "The full cat spa — bath, full grooming, dematting and styling for a soft, gorgeous coat.",
    descAr: "السبا الكامل للقطط — حمام، تنظيف كامل، فك تشابك وتنسيق لفروة ناعمة وجميلة.",
    petType: "cat",
    pricing: "flat",
    price: 320,
    features: ["Everything in Basic", "Dematting & trimming", "Styling & finishing", "Premium scented spritz"],
    featuresAr: ["كل ما في الباقة الأساسية", "فك التشابك والقص", "تنسيق وتشطيل", "بخاخ معطر فاخر"],
    popular: true,
    accent: "maroon",
  },
];

export type AddonApplies = PetType | "both";

export interface AddOn {
  id: string;
  name: string;
  nameAr: string;
  arabicTag?: string;
  price: number;
  applies: AddonApplies;
  tier?: SizeTier; // for size-based haircuts
  category: "care" | "haircut";
}

export const ADDONS: AddOn[] = [
  { id: "teeth", name: "Teeth Cleaning", nameAr: "تنظيف الأسنان", price: 25, applies: "both", category: "care" },
  { id: "eyes_ears", name: "Eye and Ear Cleaning", nameAr: "تنظيف العين والأذن", price: 25, applies: "both", category: "care" },
  { id: "sensitive", name: "Sensitive Area Cleaning", nameAr: "تنظيف المناطق الحساسة", price: 40, applies: "both", category: "care" },
  { id: "facial", name: "Facial Massage and Care", nameAr: "تدليك الوجه والعناية", price: 50, applies: "both", category: "care" },
  { id: "nails", name: "Nail Clipping", nameAr: "قص الأظافر", price: 50, applies: "both", category: "care" },
  { id: "grease", name: "Removing Grease From Hair", nameAr: "إزالة الدهون من الشعر", price: 70, applies: "both", category: "care" },
  { id: "hair_treatment", name: "Hair Treatment", nameAr: "علاج الشعر", price: 100, applies: "both", category: "care" },
  { id: "detangle", name: "Untangling Matted Hair", nameAr: "فك تشابك الشعر", price: 100, applies: "both", category: "care" },
  { id: "dry_wash", name: "Dry Wash and Haircut", nameAr: "غسيل جاف وقص الشعر", price: 200, applies: "both", category: "haircut" },
  { id: "haircut_s", name: "Small Dog Haircut", nameAr: "قص شعر كلب صغير", price: 270, applies: "dog", tier: "small", category: "haircut" },
  { id: "haircut_m", name: "Medium Dog Haircut", nameAr: "قص شعر كلب متوسط", price: 300, applies: "dog", tier: "medium", category: "haircut" },
  { id: "haircut_l", name: "Large Dog Haircut", nameAr: "قص شعر كلب كبير", price: 330, applies: "dog", tier: "large", category: "haircut" },
  { id: "haircut_xl", name: "Extra Large Dog Haircut", nameAr: "قص شعر كلب ضخم", price: 360, applies: "dog", tier: "xlarge", category: "haircut" },
];

export function packagePrice(pkg: GroomPackage, tier: SizeTier): number {
  if (pkg.pricing === "flat") return pkg.price ?? 0;
  return pkg.priceBySize?.[tier] ?? 0;
}

export function addonsForPet(petType: PetType): AddOn[] {
  return ADDONS.filter((a) => a.applies === "both" || a.applies === petType);
}

// ---------- Trust / Why-choose / FAQ content ----------
export interface FAQItem {
  q: string;
  qAr: string;
  a: string;
  aAr: string;
}

export const FAQS: FAQItem[] = [
  {
    q: "How long does grooming take?",
    qAr: "كم تستغرق عملية التنظيف؟",
    a: "Most sessions take 60–120 minutes depending on your pet's size, coat condition and the services chosen. Our groomers are punctual with appointments so you always know when we'll arrive at your door.",
    aAr: "تستغرق معظم الجلسات من 60 إلى 120 دقيقة حسب حجم حيوانك الأليف وحالة فروه والخدمات المختارة. ملتزمون بمواعيدنا حتى تعرف دائمًا متى نصل إلى باب منزلك.",
  },
  {
    q: "Do you groom cats?",
    qAr: "هل تنظفون القطط؟",
    a: "Absolutely. We offer dedicated Cat Basic and Cat Full grooming with a calm, gentle approach designed to keep kitties relaxed and comfortable.",
    aAr: "بالطبع. نقدّم تنظيفًا أساسيًا وكاملًا مخصصًا للقطط بأسلوب هادئ ولطيف مصمم لإبقاء القطط مرتاحة وهادئة.",
  },
  {
    q: "Do you accept large dogs?",
    qAr: "هل تقبلون الكلاب الكبيرة؟",
    a: "Yes! Big, small — we pamper them all. Our pricing scales gently by size, from small (1–7 kg) all the way to X-Large (above 24 kg).",
    aAr: "نعم! كبيرًا كان أم صغيرًا — ندلّلهم جميعًا. تتدرج أسعارنا بلطف حسب الحجم، من الصغير (1–7 كجم) حتى الضخم (فوق 24 كجم).",
  },
  {
    q: "Can I book online?",
    qAr: "هل يمكنني الحجز عبر الإنترنت؟",
    a: "Yes — book in under two minutes through our online reservation system. Pick your services, date and time, and receive an instant booking number. We'll confirm on WhatsApp.",
    aAr: "نعم — احجز في أقل من دقيقتين عبر نظام الحجز الإلكتروني. اختر خدماتك والتاريخ والوقت واحصل على رقم حجز فوري. سنؤكّد عبر واتساب.",
  },
  {
    q: "Do you offer additional treatments?",
    qAr: "هل تقدّمون علاجات إضافية؟",
    a: "Yes. Add teeth cleaning, nail clipping, hair treatment, facial massage, dematting, haircuts and more to any package — priced transparently in QAR.",
    aAr: "نعم. أضف تنظيف الأسنان، قص الأظافر، علاج الشعر، تدليك الوجه، فك التشابك، قص الشعر والمزيد إلى أي باقة — بأسعار شفافة بالريال القطري.",
  },
];

export interface WhyItem {
  icon: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
}

export const WHY_ITEMS: WhyItem[] = [
  {
    icon: "award",
    title: "Experienced Groomers",
    titleAr: "مدرّبون ذوو خبرة",
    desc: "10+ years of loving hands behind every groom. We know every breed and every coat.",
    descAr: "أكثر من 10 سنوات من الأيدي المحبة في كل تنظيف. نعرف كل سلالة وكل نوع فرو.",
  },
  {
    icon: "heart-handshake",
    title: "Pet-Friendly Environment",
    titleAr: "بيئة صديقة للحيوانات",
    desc: "Calm, stress-free care where tails wag and purrs happen. Your pet feels at home.",
    descAr: "رعاية هادئة خالية من التوتر حيث تتحرك الذيل وتتردد الخرخرة. يشعر حيوانك وكأنه في بيته.",
  },
  {
    icon: "sparkles",
    title: "Premium Products",
    titleAr: "منتجات فاخرة",
    desc: "Gentle, pet-safe shampoos and conditioners — hygiene comes first, always.",
    descAr: "شامبوهات وبلسم لطيفة وآمنة للحيوانات — النظافة أولًا دائمًا.",
  },
  {
    icon: "shield",
    title: "Careful Handling",
    titleAr: "تعامل بعناية",
    desc: "Patient, loving handling for nervous or senior pets. Safety is never optional.",
    descAr: "تعامل صبور ومحب للحيوانات الخجولة أو المسنّة. السلامة ليست خيارًا أبدًا.",
  },
  {
    icon: "calendar-check",
    title: "Easy Booking",
    titleAr: "حجز سهل",
    desc: "Book online in minutes. Punctual with appointments — we respect your time.",
    descAr: "احجز إلكترونيًا في دقائق. ملتزمون بالمواعيد — نحترم وقتك.",
  },
  {
    icon: "truck",
    title: "Mobile, At Your Door",
    titleAr: "خدمة متنقلة عند بابك",
    desc: "Our fully-equipped grooming van comes to you anywhere in Doha. Zero travel stress.",
    descAr: "تأتيك شاحنتنا المجهزة بالكامل في أي مكان بالدوحة. صفر توتر للتنقل.",
  },
];

export interface ServiceCardItem {
  icon: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  from: number;
  accent: "maroon" | "pine" | "honey" | "aqua";
}

export const HOME_SERVICES: ServiceCardItem[] = [
  {
    icon: "dog",
    title: "Dog Basic Grooming",
    titleAr: "تنظيف أساسي للكلاب",
    desc: "A refreshing bath, brush-out and tidy finish to keep your pup clean and happy.",
    descAr: "حمام منعش وتسريح ولمسة نهائية مرتبة لإبقاء جروك نظيفًا وسعيدًا.",
    from: 250,
    accent: "aqua",
  },
  {
    icon: "scissors",
    title: "Dog Full Grooming",
    titleAr: "تنظيف كامل للكلاب",
    desc: "The complete pamper — bath, full breed haircut, styling and detailed finishing.",
    descAr: "العناية الكاملة — حمام، قص كامل حسب السلالة، تنسيق وتشطيل مفصّل.",
    from: 320,
    accent: "maroon",
  },
  {
    icon: "cat",
    title: "Cat Grooming",
    titleAr: "تنظيف القطط",
    desc: "A calm, gentle groom crafted for cats — bath, brush and tidy finish, stress-free.",
    descAr: "تنظيف هادئ ولطيف مصمم للقطط — حمام وتسريح ولمسة نهائية مرتبة بلا توتر.",
    from: 250,
    accent: "pine",
  },
  {
    icon: "sparkles",
    title: "Add-on Services",
    titleAr: "خدمات إضافية",
    desc: "Teeth cleaning, hair treatment, nail clipping, dematting, haircuts and much more.",
    descAr: "تنظيف الأسنان، علاج الشعر، قص الأظافر، فك التشابك، قص الشعر والمزيد.",
    from: 25,
    accent: "honey",
  },
];

export interface TrustStat {
  value: string;
  label: string;
  labelAr: string;
}

export const TRUST_STATS: TrustStat[] = [
  { value: "8,500+", label: "Happy Pets Pampered", labelAr: "حيوان مدلّل سعيد" },
  { value: "10+", label: "Years of Experience", labelAr: "سنوات خبرة" },
  { value: "4.9★", label: "Average Rating", labelAr: "متوسط التقييم" },
  { value: "100%", label: "Pet-Safe Products", labelAr: "منتجات آمنة" },
];

// Note: testimonials intentionally left as blank/verified placeholders per brand request.
export interface Testimonial {
  initials: string;
  name: string;
  pet: string;
  petAr: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { initials: "AP", name: "Verified GroomMe Parent", pet: "Dog parent · Doha", petAr: "والد كلب · الدوحة" },
  { initials: "MK", name: "Verified GroomMe Parent", pet: "Cat parent · West Bay", petAr: "والد قطة · الخليج الغربي" },
  { initials: "RS", name: "Verified GroomMe Parent", pet: "Dog parent · The Pearl", petAr: "والد كلب · اللؤلؤة" },
  { initials: "LA", name: "Verified GroomMe Parent", pet: "Cat parent · Al Sadd", petAr: "والد قطة · السد" },
];

export const WHATSAPP_URL = "https://wa.me/message/5PTJ3ZAIADGFM1";
export const INSTAGRAM_URL = "https://www.instagram.com/groomme.qa";
export const TRADE_LICENSE = "232377";
