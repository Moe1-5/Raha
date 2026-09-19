import { FormEvent, useMemo, useState } from "react";
import { MessageCircleMore } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { Copy, Language } from "../i18n";
import { detailedMessage, type HotelKey, type ReservationValues, whatsappUrl } from "../lib/whatsapp";

interface ReservationFormProps {
  language: Language;
  copy: Copy;
}

const inputClass =
  "min-h-14 w-full rounded-2xl border border-coffee/15 bg-paper px-4 py-3 text-base text-coffee-deep outline-none transition placeholder:text-coffee/35 focus:border-olive focus:ring-4 focus:ring-fawn/25";

export function ReservationForm({ language, copy }: ReservationFormProps) {
  const [error, setError] = useState("");
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const values: ReservationValues = {
      hotel: data.get("hotel") as HotelKey,
      arrival: String(data.get("arrival") || ""),
      departure: String(data.get("departure") || ""),
      rooms: String(data.get("rooms") || ""),
      guests: String(data.get("guests") || ""),
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      notes: String(data.get("notes") || "")
    };

    const valid =
      form.checkValidity() &&
      (values.hotel === "verta" || values.hotel === "rafahya") &&
      Boolean(values.arrival && values.departure) &&
      values.departure > values.arrival;

    if (!valid) {
      setError(copy.formError);
      form.reportValidity();
      return;
    }

    const url = whatsappUrl(detailedMessage(values, language));
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) window.location.assign(url);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
      <div className="self-start lg:sticky lg:top-32">
        <p className="eyebrow">{copy.requestEyebrow}</p>
        <h2 className="section-title">{copy.requestTitle}</h2>
        <p className="max-w-xl text-sm leading-7 text-coffee/65 sm:text-base sm:leading-8">{copy.requestBody}</p>

        <div className="mt-7 flex items-start gap-3 rounded-3xl border-s-4 border-fawn bg-porcelain p-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-fawn-soft text-olive">
            <MessageCircleMore size={20} aria-hidden="true" />
          </span>
          <p className="m-0 text-sm leading-7 text-coffee/65">
            <strong className="block text-coffee">{copy.responseTitle}</strong>
            {copy.responseBody}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-4xl border border-coffee/10 bg-porcelain p-5 shadow-card sm:grid-cols-2 sm:p-8"
        noValidate
      >
        <label className="grid gap-2 text-sm font-black text-coffee sm:col-span-2">
          {copy.hotelLabel}
          <select className={inputClass} name="hotel" defaultValue="" required>
            <option value="" disabled>
              {copy.selectHotel}
            </option>
            <option value="verta">{copy.vertaName}</option>
            <option value="rafahya">{copy.rafahyaName}</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-black text-coffee">
          {copy.arrivalLabel}
          <input className={inputClass} name="arrival" type="date" min={today} required />
        </label>
        <label className="grid gap-2 text-sm font-black text-coffee">
          {copy.departureLabel}
          <input className={inputClass} name="departure" type="date" min={today} required />
        </label>
        <label className="grid gap-2 text-sm font-black text-coffee">
          {copy.roomsLabel}
          <input className={inputClass} name="rooms" type="number" min="1" defaultValue="1" required />
        </label>
        <label className="grid gap-2 text-sm font-black text-coffee">
          {copy.guestsLabel}
          <input className={inputClass} name="guests" type="number" min="1" defaultValue="2" required />
        </label>
        <label className="grid gap-2 text-sm font-black text-coffee">
          {copy.nameLabel}
          <input
            className={inputClass}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-black text-coffee">
          {copy.phoneLabel}
          <input
            className={inputClass}
            name="phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder={copy.phonePlaceholder}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-black text-coffee sm:col-span-2">
          {copy.notesLabel}
          <textarea
            className={`${inputClass} min-h-28 resize-none`}
            name="notes"
            rows={3}
            placeholder={copy.notesPlaceholder}
          />
        </label>

        <p className="min-h-6 text-sm font-bold text-campaign-red sm:col-span-2" role="status" aria-live="polite">
          {error}
        </p>
        <button
          type="submit"
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#196b51] px-6 py-3 text-center text-sm font-black leading-6 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#125540] sm:col-span-2"
        >
          <SiWhatsapp className="text-xl" aria-hidden="true" />
          {copy.sendWhatsapp}
        </button>
      </form>
    </div>
  );
}
