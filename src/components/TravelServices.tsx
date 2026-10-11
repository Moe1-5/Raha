import { BusFront, Plane } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { travelWhatsappUrl } from "../lib/whatsapp";

export const travelHeroCopy = {
  eyebrow: "Uçuş ve otobüs organizasyonu",
  title: "Yolculuğunuzu birlikte planlayalım.",
  body: "Umre acentaları ve gruplar için tarifeli, zincir ve charter uçuşlar; devre kamil otobüs hizmetleri ve grup transferleri. Programınızı paylaşın, seyahatinizi birlikte planlayalım.",
  contact: "WhatsApp'tan bilgi al",
  explore: "Hizmetleri incele"
};

export function TravelServices() {
  const services = [
    {
      key: "flights", icon: Plane, label: "Uçuş hizmetleri", image: "flights-tr",
      title: "Tarifeli, zincir ve charter uçuş çözümleri",
      body: "Umre acentaları ve gruplar için uçuş organizasyonunu koordine ediyoruz. Tarihlerinize, kişi sayınıza ve müsaitliğe uygun seçenekler için ekibimizle görüşün.",
      button: "Uçuş için bilgi al",
      message: "Merhaba, grubumuz için tarifeli, zincir veya charter uçuş organizasyonu hakkında bilgi almak istiyorum."
    },
    {
      key: "bus", icon: BusFront, label: "Otobüs hizmetleri", image: "bus-tr",
      title: "Devre kamil hizmetleri ve grup ulaşımı",
      body: "Grup transferleri ve ziyaret programlarınız için otobüs organizasyonu. Güzergâhınızı, tarihlerinizi ve yolcu sayınızı paylaşın; ulaşım seçeneklerini birlikte planlayalım.",
      button: "Otobüs için bilgi al",
      message: "Merhaba, grubumuz için devre kamil otobüs hizmetleri ve transfer organizasyonu hakkında bilgi almak istiyorum."
    }
  ];
  return (
    <section id="travel-services" className="relative scroll-mt-28 bg-teal py-16 text-white sm:py-24" aria-labelledby="travel-title">
      <span id="offers" className="absolute top-0" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-fawn">Acentalara ve gruplara özel</p>
        <h2 id="travel-title" className="max-w-3xl font-display text-3xl font-black leading-[1.35] sm:text-5xl">Gökyüzünden yola, yolculuğunuzu birlikte planlayalım.</h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">Umre acentaları ve gruplar için uçuş ve otobüs organizasyonu. Seyahat programınızı paylaşın; uygun seçenekleri birlikte değerlendirelim.</p>
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          {services.map(({ icon: Icon, ...service }) => (
            <article key={service.key} className="flex min-w-0 flex-col overflow-hidden rounded-4xl border border-white/15 bg-white/[0.07]">
              <img src={`/assets/production-posters/${service.image}.png`} alt={service.title} className="aspect-[3/4] w-full object-contain p-3" loading="lazy" width="1080" height="1440" />
              <div className="flex flex-1 flex-col p-5 sm:p-7">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold text-fawn"><Icon size={18} aria-hidden="true" />{service.label}</p>
                <h3 className="text-xl font-black leading-7">{service.title}</h3>
                <p className="mb-6 mt-3 text-sm leading-7 text-white/70">{service.body}</p>
                <a href={travelWhatsappUrl(service.message)} target="_blank" rel="noopener noreferrer" className="primary-button mt-auto bg-fawn text-coffee-deep hover:bg-[#edc98f]" data-travel-contact>
                  <SiWhatsapp className="shrink-0 text-lg" aria-hidden="true" />{service.button}
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-7 flex flex-wrap items-center justify-center gap-3 border-t border-white/15 pt-6 text-xs leading-6 text-white/70">
          Yalnızca uçuş ve otobüs: <a href="tel:+905547490137" className="font-bold text-fawn" dir="ltr">+90 554 749 01 37</a>
          <span>Otel rezervasyonları mevcut rezervasyon numaramızdan devam eder.</span>
        </p>
      </div>
    </section>
  );
}
