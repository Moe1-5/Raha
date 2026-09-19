import { ExternalLink, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { HotelKey } from "../lib/whatsapp";

interface HotelCardProps {
  hotel: HotelKey;
  image: string;
  city: string;
  label: string;
  name: string;
  description: string;
  amenities: string[];
  whatsappLabel: string;
  whatsappHref: string;
  mapLabel: string;
  mapHref: string;
}

export function HotelCard({
  hotel,
  image,
  city,
  label,
  name,
  description,
  amenities,
  whatsappLabel,
  whatsappHref,
  mapLabel,
  mapHref
}: HotelCardProps) {
  return (
    <article className="group overflow-hidden rounded-4xl border border-coffee/10 bg-porcelain transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative grid aspect-[4/5] max-h-[34rem] place-items-center overflow-hidden bg-gradient-to-br from-teal to-teal-deep p-3 sm:aspect-[5/4]">
        <img
          src={image}
          alt={name}
          className="h-full w-full rounded-3xl object-contain"
          loading="lazy"
          width="1080"
          height="1440"
        />
        <span className="absolute end-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-paper/95 px-3 py-2 text-xs font-black text-coffee shadow">
          <MapPin size={14} />
          {city}
        </span>
      </div>

      <div className="p-5 sm:p-7">
        <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-olive">{label}</p>
        <h3 className="mb-3 font-display text-2xl font-black leading-snug text-coffee-deep">{name}</h3>
        <p className="min-h-0 text-sm leading-7 text-coffee/65 sm:min-h-[3.5rem]">{description}</p>

        <ul className="my-5 flex flex-wrap gap-2" aria-label="Amenities">
          {amenities.map((amenity) => (
            <li key={amenity} className="rounded-full bg-fawn-soft px-3 py-2 text-xs font-extrabold text-coffee">
              {amenity}
            </li>
          ))}
        </ul>

        <div className="grid gap-2 border-t border-coffee/10 pt-5 sm:grid-cols-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-hotel={hotel}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#196b51] px-4 py-3 text-center text-xs font-black leading-5 text-white transition hover:bg-[#125540]"
          >
            <SiWhatsapp className="text-lg" aria-hidden="true" />
            {whatsappLabel}
          </a>
          <a
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-coffee/15 bg-paper px-4 py-3 text-center text-xs font-black leading-5 text-coffee transition hover:bg-fawn-soft"
          >
            <ExternalLink size={16} aria-hidden="true" />
            {mapLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
