import { supabase, isSupabaseConfigured } from "./supabase";

// ---------- Types ----------
export interface BookingPet {
  name: string;
  type: "dog" | "cat";
  breed: string;
  age: string;
  weight: string;
  gender: "male" | "female";
  notes?: string;
}

export interface BookingService {
  packageId: string;
  packageName: string;
  addonIds: string[];
  addonNames: string[];
}

export interface BookingPayload {
  customer: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    area?: string;
  };
  pet: BookingPet;
  service: BookingService;
  schedule: { date: string; time: string };
  total: number;
}

export interface BookingResult {
  bookingNumber: string;
  demo: boolean;
}

// ---------- Booking number ----------
export function generateBookingNumber(): string {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `GM-2026-${n}`;
}

// ---------- Local demo store (used when Supabase isn't configured) ----------
const LOCAL_KEY = "groomme.bookings";
const LOCAL_SLOTS_KEY = "groomme.slots"; // date -> string[]

type LocalBooking = BookingPayload & { bookingNumber: string; createdAt: string };

function readLocal(): LocalBooking[] {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeLocal(list: LocalBooking[]) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}
function readLocalSlots(date: string): string[] {
  try {
    const all = JSON.parse(window.localStorage.getItem(LOCAL_SLOTS_KEY) || "{}");
    return all[date] || [];
  } catch {
    return [];
  }
}
function addLocalSlot(date: string, time: string) {
  try {
    const all = JSON.parse(window.localStorage.getItem(LOCAL_SLOTS_KEY) || "{}");
    all[date] = Array.from(new Set([...(all[date] || []), time]));
    window.localStorage.setItem(LOCAL_SLOTS_KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
}

// ---------- Public API ----------
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Times already taken for a given date (ISO yyyy-mm-dd). */
export async function getBookedTimes(date: string): Promise<string[]> {
  if (!date) return [];
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("appointments")
      .select("time")
      .eq("date", date)
      .neq("status", "cancelled");
    if (error) return [];
    return (data || []).map((r) => r.time as string);
  }
  await wait(150);
  return readLocalSlots(date);
}

/** Create a booking. Prevents double-booking server-side / locally. */
export async function createBooking(
  payload: BookingPayload
): Promise<BookingResult> {
  const bookingNumber = generateBookingNumber();

  if (isSupabaseConfigured && supabase) {
    // 1. upsert customer
    const { data: customer, error: cErr } = await supabase
      .from("customers")
      .upsert(
        { name: payload.customer.name, phone: payload.customer.phone, email: payload.customer.email },
        { onConflict: "email" }
      )
      .select("id")
      .single();
    if (cErr || !customer) throw new Error("Could not save customer");

    // 2. create pet
    const { data: pet, error: pErr } = await supabase
      .from("pets")
      .insert({
        customer_id: customer.id,
        name: payload.pet.name,
        type: payload.pet.type,
        breed: payload.pet.breed,
        age: payload.pet.age,
        weight: payload.pet.weight,
        notes: payload.pet.notes || null,
      })
      .select("id")
      .single();
    if (pErr || !pet) throw new Error("Could not save pet");

    // 3. find service row (by name) else insert
    const { data: svc } = await supabase
      .from("services")
      .select("id")
      .eq("name", payload.service.packageName)
      .maybeSingle();
    let serviceId: string | null = svc?.id ?? null;
    if (!serviceId) {
      const { data: newSvc } = await supabase
        .from("services")
        .insert({ name: payload.service.packageName, category: "package", price: payload.total, duration: 90 })
        .select("id")
        .single();
      serviceId = newSvc?.id ?? null;
    }

    // 4. create appointment
    const { error: aErr } = await supabase.from("appointments").insert({
      customer_id: customer.id,
      pet_id: pet.id,
      service_id: serviceId,
      date: payload.schedule.date,
      time: payload.schedule.time,
      status: "pending",
      total_price: payload.total,
    });
    if (aErr) throw new Error("Could not create appointment");
    return { bookingNumber, demo: false };
  }

  // ---- Local demo fallback ----
  await wait(900);
  const booked = await getBookedTimes(payload.schedule.date);
  if (booked.includes(payload.schedule.time)) {
    throw new Error("SLOT_TAKEN");
  }
  addLocalSlot(payload.schedule.date, payload.schedule.time);
  const list = readLocal();
  list.push({ ...payload, bookingNumber, createdAt: new Date().toISOString() });
  writeLocal(list);
  return { bookingNumber, demo: true };
}
