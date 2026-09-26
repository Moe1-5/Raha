import { HandHeart, BusFront, ExternalLink, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { Copy, Language } from "../i18n";
import { directMessage, type HotelKey, whatsappUrl } from "../lib/whatsapp";

interface MarketingProps {
  language: Language;
  copy: Copy;
}

const marketing = {
  ar: {
    galleryEyebrow: "من داخل فنادقنا",
    galleryTitle: "شاهد تفاصيل إقامتك قبل أن تختار.",
    galleryBody: "صور حقيقية من الغرف والمرافق والضيافة في الفنادق المعروضة.",
    vertaIntro: "في محبس الجن بمكة، يجمع فيرتا المحبس بين الغرف والخدمات التي تسهّل إقامة الأفراد والمجموعات.",
    rafahyaIntro: "لمحة من غرف فندق رفاهية الكرام وصالة الضيافة والبوفيه.",
    room: "الغرف",
    buffet: "البوفيه",
    lobby: "الاستقبال",
    amenities: ["500 غرفة", "13 مصعدًا", "خدمة عملاء", "إنترنت مجاني", "بوفيه مفتوح بطابع تركي", "مصلى للرجال", "مصلى للنساء", "مواقف خاصة مدفوعة مسبقًا", "مسار نسك", "حافلات من وإلى الحرم"],
    madinahEyebrow: "فنادق المدينة المنورة",
    madinahTitle: "خيارات أخرى لرحلتك إلى المدينة.",
    madinahBody: "تعرّف على الفنادق المصوّرة، وتواصل معنا للاستفسار عن الغرف والتوفر والأسعار.",
    madinah: "المدينة المنورة",
    photoServicesEyebrow: "من رحلتك معنا",
    photoServicesTitle: "الضيافة والنقل في صورة أوضح.",
    receptionTitle: "لحظات من استقبال الضيوف",
    receptionBody: "لقطة من إحدى مناسبات استقبال الضيوف.",
    transportTitle: "تنسيق خدمات النقل",
    transportBody: "نساعد في تنسيق تنقلات الأفراد والمجموعات. اسأل فريقنا عن المسارات والخدمات المتاحة لرحلتك.",
    askTransport: "استفسر عن النقل",
    transportMessage: "السلام عليكم، أرغب في الاستفسار عن خدمات النقل لرحلتي."
  },
  en: {
    galleryEyebrow: "Inside the hotels",
    galleryTitle: "See the details before choosing your stay.",
    galleryBody: "Real photos of rooms, facilities, and dining at the featured hotels.",
    vertaIntro: "In Makkah's Mahbas Al Jinn area, Verta Mahbas offers rooms and services for individual and group stays.",
    rafahyaIntro: "A look at Rafahya Al Karam's rooms, guest lounge, and buffet.",
    room: "Rooms",
    buffet: "Buffet",
    lobby: "Guest lounge",
    amenities: ["500 rooms", "13 elevators", "Guest service", "Free internet", "Open buffet with Turkish cuisine", "Men's prayer room", "Women's prayer room", "Prepaid private parking", "Nusuk route", "Buses to and from the Haram"],
    madinahEyebrow: "Hotels in Madinah",
    madinahTitle: "More options for your Madinah stay.",
    madinahBody: "Explore photos of these hotels, then ask our team about rooms, availability, and rates.",
    madinah: "Madinah",
    photoServicesEyebrow: "Along your journey",
    photoServicesTitle: "A closer look at hospitality and transport.",
    receptionTitle: "A moment welcoming guests",
    receptionBody: "A glimpse from a guest reception occasion.",
    transportTitle: "Transport coordination",
    transportBody: "We help coordinate transport for individuals and groups. Ask our team about routes and available services for your trip.",
    askTransport: "Ask about transport",
    transportMessage: "Hello, I would like to ask about transport services for my trip."
  },
  tr: {
    galleryEyebrow: "Otellerden görüntüler",
    galleryTitle: "Konaklamanızı seçmeden önce ayrıntıları görün.",
    galleryBody: "Öne çıkan otellerin odalarından, tesislerinden ve yemek alanlarından gerçek fotoğraflar.",
    vertaIntro: "Mekke'deki Mahbes bölgesinde Verta Mahbas, bireysel ve grup konaklaması için odalar ve hizmetler sunuyor.",
    rafahyaIntro: "Rafahya Al Karam'ın odaları, konuk salonu ve açık büfesinden görüntüler.",
    room: "Odalar",
    buffet: "Açık büfe",
    lobby: "Konuk salonu",
    amenities: ["500 oda", "13 asansör", "Misafir hizmetleri", "Ücretsiz internet", "Türk mutfağından açık büfe", "Erkek mescidi", "Kadın mescidi", "Ön ödemeli özel otopark", "Nusuk güzergâhı", "Harem'e gidiş-dönüş otobüsleri"],
    madinahEyebrow: "Medine otelleri",
    madinahTitle: "Medine konaklamanız için başka seçenekler.",
    madinahBody: "Otellerin fotoğraflarına göz atın; oda, müsaitlik ve fiyat bilgisi için ekibimize yazın.",
    madinah: "Medine",
    photoServicesEyebrow: "Yolculuğunuzdan kareler",
    photoServicesTitle: "Konukseverlik ve ulaşıma yakından bakın.",
    receptionTitle: "Misafirleri karşıladığımız bir an",
    receptionBody: "Bir misafir karşılama etkinliğinden kare.",
    transportTitle: "Ulaşım organizasyonu",
    transportBody: "Bireyler ve gruplar için ulaşımı koordine etmeye yardımcı oluyoruz. Güzergâhlar ve mevcut hizmetler için ekibimize danışın.",
    askTransport: "Ulaşımı sorun",
    transportMessage: "Merhaba, yolculuğum için ulaşım hizmetleri hakkında bilgi almak istiyorum."
  }
} as const;

export function HotelHighlights({ language, copy }: MarketingProps) {
  const t = marketing[language];

  return (
    <section id="hotel-photos" className="scroll-mt-28 bg-fawn-soft py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">{t.galleryEyebrow}</p>
        <h2 className="section-title">{t.galleryTitle}</h2>
        <p className="mb-9 max-w-2xl text-sm leading-7 text-coffee/65 sm:text-base">{t.galleryBody}</p>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden rounded-4xl border border-coffee/10 bg-paper shadow-sm">
            <div className="grid grid-cols-2 gap-2 p-3 sm:p-4">
              <figure className="min-w-0 overflow-hidden rounded-2xl">
                <img src="/assets/marketing/verta-room.jpg" alt={`${copy.vertaName} · ${t.room}`} className="aspect-[4/3] w-full object-cover" loading="lazy" width="1200" height="900" />
                <figcaption className="p-2 text-xs font-bold text-coffee/65">{t.room}</figcaption>
              </figure>
              <figure className="min-w-0 overflow-hidden rounded-2xl">
                <img src="/assets/marketing/verta-buffet.jpg" alt={`${copy.vertaName} · ${t.buffet}`} className="aspect-[4/3] w-full object-cover" loading="lazy" width="1200" height="900" />
                <figcaption className="p-2 text-xs font-bold text-coffee/65">{t.buffet}</figcaption>
              </figure>
            </div>
            <div className="px-5 pb-6 sm:px-7 sm:pb-7">
              <h3 className="font-display text-2xl font-black text-coffee-deep">{copy.vertaName}</h3>
              <p className="mt-3 text-sm leading-7 text-coffee/65">{t.vertaIntro}</p>
              <ul className="mt-5 grid grid-cols-2 gap-2 text-xs font-bold leading-5 text-coffee sm:text-sm">
                {t.amenities.map((amenity) => (
                  <li key={amenity} className="flex min-h-12 items-center rounded-xl bg-porcelain px-3 py-2">{amenity}</li>
                ))}
              </ul>
              <a href={whatsappUrl(directMessage(language, "verta"))} target="_blank" rel="noopener noreferrer" className="primary-button mt-6 bg-[#196b51] hover:bg-[#125540]">
                <SiWhatsapp className="text-lg" aria-hidden="true" />{copy.chooseHotel}
              </a>
            </div>
          </article>

          <article className="overflow-hidden rounded-4xl border border-coffee/10 bg-paper shadow-sm">
            <div className="grid grid-cols-2 gap-2 p-3 sm:p-4">
              <figure className="min-w-0 overflow-hidden rounded-2xl">
                <img src="/assets/marketing/rafahya-room.jpg" alt={`${copy.rafahyaName} · ${t.room}`} className="aspect-[4/3] w-full object-cover" loading="lazy" width="1200" height="900" />
                <figcaption className="p-2 text-xs font-bold text-coffee/65">{t.room}</figcaption>
              </figure>
              <figure className="min-w-0 overflow-hidden rounded-2xl">
                <img src="/assets/marketing/raf-buffet.jpg" alt={`${copy.rafahyaName} · ${t.buffet}`} className="aspect-[4/3] w-full object-cover" loading="lazy" width="1200" height="900" />
                <figcaption className="p-2 text-xs font-bold text-coffee/65">{t.buffet}</figcaption>
              </figure>
            </div>
            <div className="px-5 pb-6 sm:px-7 sm:pb-7">
              <h3 className="font-display text-2xl font-black text-coffee-deep">{copy.rafahyaName}</h3>
              <p className="mt-3 text-sm leading-7 text-coffee/65">{t.rafahyaIntro}</p>
              <img src="/assets/marketing/rafahya-lobby.jpg" alt={`${copy.rafahyaName} · ${t.lobby}`} className="mt-5 aspect-[16/9] w-full rounded-2xl object-cover" loading="lazy" width="1200" height="675" />
              <a href={whatsappUrl(directMessage(language, "rafahya"))} target="_blank" rel="noopener noreferrer" className="primary-button mt-6 bg-[#196b51] hover:bg-[#125540]">
                <SiWhatsapp className="text-lg" aria-hidden="true" />{copy.chooseHotel}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function MadinahHotels({ language, copy }: MarketingProps) {
  const t = marketing[language];
  const hotels: { key: HotelKey; name: string; image: string }[] = [
    { key: "mirage", name: copy.mirageName, image: "/assets/marketing/miraj-taiba.jpg" },
    { key: "diwan", name: copy.diwanName, image: "/assets/marketing/diwan-al-hijrah.jpg" },
    { key: "arjwan", name: copy.arjwanName, image: "/assets/marketing/arjwan-rose.jpg" },
    { key: "abraj", name: copy.abrajName, image: "/assets/marketing/abraj-tabah.jpg" }
  ];

  return (
    <section id="madinah-hotels" className="scroll-mt-28 bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">{t.madinahEyebrow}</p>
        <h2 className="section-title">{t.madinahTitle}</h2>
        <p className="mb-9 max-w-2xl text-sm leading-7 text-coffee/65 sm:text-base">{t.madinahBody}</p>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {hotels.map((hotel) => (
            <article key={hotel.key} className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-coffee/10 bg-porcelain">
              <img src={hotel.image} alt={hotel.name} className="aspect-[4/3] w-full object-cover" loading="lazy" width="1200" height="900" />
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold text-olive"><MapPin size={14} aria-hidden="true" />{t.madinah}</p>
                <h3 className="mb-5 font-display text-xl font-black leading-7 text-coffee-deep">{hotel.name}</h3>
                <a href={whatsappUrl(directMessage(language, hotel.key))} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#196b51] px-4 py-2 text-center text-xs font-black text-white hover:bg-[#125540]">
                  <SiWhatsapp className="text-lg" aria-hidden="true" />{copy.chooseHotel}
                </a>
                {hotel.key === "mirage" && (
                  <a href="https://www.google.com/maps?q=Meraj+Hotel+Taiba%2C+Madinah+42311&ftid=0x15bdbfaeb180d789:0x50cdb4833d80e78b" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-coffee/15 bg-paper px-4 py-2 text-center text-xs font-black text-coffee hover:bg-fawn-soft">
                    <ExternalLink size={15} aria-hidden="true" />{copy.viewMap}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesInPictures({ language }: MarketingProps) {
  const t = marketing[language];
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">{t.photoServicesEyebrow}</p>
        <h2 className="section-title">{t.photoServicesTitle}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-4xl bg-fawn-soft">
            <img src="/assets/marketing/welcome.jpg" alt={t.receptionTitle} className="aspect-[16/10] w-full object-cover" loading="lazy" width="1200" height="750" />
            <div className="p-5 sm:p-7">
              <h3 className="flex items-center gap-2 font-display text-xl font-black text-coffee-deep"><HandHeart size={21} className="shrink-0" aria-hidden="true" />{t.receptionTitle}</h3>
              <p className="mt-2 text-sm leading-7 text-coffee/65">{t.receptionBody}</p>
            </div>
          </article>
          <article className="overflow-hidden rounded-4xl bg-fawn-soft">
            <img src="/assets/marketing/transport.jpg" alt={t.transportTitle} className="aspect-[16/10] w-full object-cover" loading="lazy" width="1200" height="750" />
            <div className="p-5 sm:p-7">
              <h3 className="flex items-center gap-2 font-display text-xl font-black text-coffee-deep"><BusFront size={21} className="shrink-0" aria-hidden="true" />{t.transportTitle}</h3>
              <p className="mt-2 text-sm leading-7 text-coffee/65">{t.transportBody}</p>
              <a href={whatsappUrl(t.transportMessage)} target="_blank" rel="noopener noreferrer" className="primary-button mt-5 bg-[#196b51] hover:bg-[#125540]"><SiWhatsapp className="shrink-0 text-lg" aria-hidden="true" />{t.askTransport}</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
