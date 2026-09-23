import { getCopy, type Language } from "../i18n";

export type HotelKey = "verta" | "rafahya" | "mirage";

export interface ReservationValues {
  hotel: HotelKey;
  arrival: string;
  departure: string;
  rooms: string;
  guests: string;
  name: string;
  phone: string;
  notes: string;
}

const configuredNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
export const whatsappNumber = (configuredNumber || "966509530219").replace(/\D/g, "");

export function hotelName(hotel: HotelKey, language: Language) {
  const copy = getCopy(language);
  if (hotel === "verta") return copy.vertaName;
  if (hotel === "mirage") return copy.mirageName;
  return copy.rafahyaName;
}

export function directMessage(language: Language, hotel?: HotelKey) {
  const selectedHotel = hotel ? hotelName(hotel, language) : "";

  if (language === "tr") {
    return selectedHotel
      ? `Merhaba, ${selectedHotel} için rezervasyon hakkında bilgi almak istiyorum.`
      : "Merhaba, otel rezervasyonu hakkında bilgi almak istiyorum.";
  }

  if (language === "en") {
    return selectedHotel
      ? `Hello, I would like to ask about a reservation at ${selectedHotel}.`
      : "Hello, I would like to ask about a hotel reservation.";
  }

  return selectedHotel
    ? `السلام عليكم، أرغب في الاستفسار عن حجز في ${selectedHotel}.`
    : "السلام عليكم، أرغب في الاستفسار عن حجز فندق.";
}

export function detailedMessage(values: ReservationValues, language: Language) {
  const hotel = hotelName(values.hotel, language);
  const notes = values.notes || "-";

  if (language === "tr") {
    return `Merhaba, otel rezervasyonu hakkında bilgi almak istiyorum.

Otel: ${hotel}
Giriş: ${values.arrival}
Çıkış: ${values.departure}
Oda: ${values.rooms}
Kişi: ${values.guests}
Ad soyad: ${values.name}
Telefon: ${values.phone}
Not: ${notes}`;
  }

  if (language === "en") {
    return `Hello, I would like to request a hotel reservation.

Hotel: ${hotel}
Arrival: ${values.arrival}
Departure: ${values.departure}
Rooms: ${values.rooms}
Guests: ${values.guests}
Name: ${values.name}
Phone: ${values.phone}
Notes: ${notes}`;
  }

  return `السلام عليكم، أرغب في الاستفسار عن حجز فندق.

الفندق: ${hotel}
تاريخ الوصول: ${values.arrival}
تاريخ المغادرة: ${values.departure}
عدد الغرف: ${values.rooms}
عدد الأشخاص: ${values.guests}
الاسم: ${values.name}
رقم الهاتف: ${values.phone}
ملاحظات: ${notes}`;
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
