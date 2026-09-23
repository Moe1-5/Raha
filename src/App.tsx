import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  BedDouble,
  BusFront,
  Check,
  Clock3,
  Mail,
  Phone,
  UtensilsCrossed,
  Wifi,
  Zap
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Brand } from "./components/Brand";
import { Header } from "./components/Header";
import { HotelCard } from "./components/HotelCard";
import { ReservationForm } from "./components/ReservationForm";
import { SocialLinks } from "./components/SocialLinks";
import { getCopy, type Language } from "./i18n";
import { directMessage, type HotelKey, whatsappUrl } from "./lib/whatsapp";

const maps = {
  verta:
    "https://www.google.com/maps?q=Verta+Hotel+Mahbas&ftid=0x15c20591f74560dd:0x76b2c4bc6eaf53ef",
  rafahya:
    "https://maps.app.goo.gl/12CX4Q9jC3kXijEw6"
} satisfies Record<HotelKey, string>;

function initialLanguage(): Language {
  const stored = localStorage.getItem("rihlat-language");
  return stored === "en" || stored === "tr" ? stored : "ar";
}

function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const copy = useMemo(() => getCopy(language), [language]);
  const directWhatsapp = whatsappUrl(directMessage(language));
  const heroPoster = language === "tr" ? "/assets/verta-karim-tr.png" : "/assets/promo.jpeg";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title =
      language === "ar"
        ? "رحلة الراحة | حجز فنادق مكة"
        : language === "tr"
          ? "Rihlat Al Raha | Mekke Otelleri"
          : "Rihlat Al Raha | Makkah Hotels";
    localStorage.setItem("rihlat-language", language);
  }, [language]);

  const hotelImages = {
    verta: "/assets/promo.jpeg",
    rafahya: language === "tr" ? "/assets/verta-karim-tr.png" : "/assets/promo-3.jpeg"
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-porcelain text-coffee-deep">
      <Header language={language} onLanguageChange={setLanguage} copy={copy} />

      <main>
        <section id="top" className="relative overflow-hidden py-14 sm:py-20 lg:min-h-[44rem] lg:py-24">
          <div className="hero-grid-pattern absolute inset-y-0 start-0 w-72 opacity-40" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-fawn-soft/70 lg:inset-y-0 lg:start-auto lg:end-0 lg:h-auto lg:w-[38%]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
            <div className="min-w-0">
              <div className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full bg-teal px-2 py-1.5 pe-4 text-xs font-black leading-5 text-white sm:text-sm">
                <span className="grid min-h-9 min-w-9 place-items-center rounded-full bg-campaign-green px-2" dir="ltr">
                  96
                </span>
                <span>{copy.campaignKicker}</span>
              </div>

              <p className="eyebrow">{copy.heroEyebrow}</p>
              <h1 className="max-w-3xl font-display text-[clamp(2.45rem,11vw,4.25rem)] font-black leading-[1.28] tracking-[-0.02em] text-coffee-deep rtl:leading-[1.45] lg:text-[clamp(4rem,6vw,5.7rem)]">
                {copy.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-coffee/65 sm:text-lg sm:leading-9">{copy.heroBody}</p>

              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                <a
                  href={directWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button bg-[#196b51] hover:bg-[#125540]"
                >
                  <SiWhatsapp className="text-xl" aria-hidden="true" />
                  {copy.startRequest}
                </a>
                <a href="#hotels" className="secondary-button">
                  {copy.exploreHotels}
                  <ArrowDown size={18} aria-hidden="true" />
                </a>
              </div>

              <ul className="mt-9 grid gap-2 sm:flex sm:flex-wrap" aria-label="Highlights">
                {[
                  [Clock3, copy.service24],
                  [Wifi, copy.freeWifi],
                  [Zap, copy.fastRequest]
                ].map(([Icon, label]) => {
                  const HighlightIcon = Icon as typeof Clock3;
                  return (
                    <li
                      key={String(label)}
                      className="flex min-h-12 items-center gap-2 rounded-full border border-coffee/10 bg-white/70 px-3 py-2 text-xs font-extrabold leading-5 text-olive"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fawn-soft text-coffee">
                        <HighlightIcon size={16} aria-hidden="true" />
                      </span>
                      {String(label)}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[28rem]">
              <div className="absolute -inset-3 translate-x-2 translate-y-4 rounded-4xl border-2 border-fawn" aria-hidden="true" />
              <figure className="relative rounded-4xl bg-paper p-2.5 shadow-card sm:p-3">
                <img
                  src={heroPoster}
                  alt={language === "tr" ? "Rihlat Al Raha Türkçe otel kampanyası" : "عرض فندقي من رحلة الراحة"}
                  className="max-h-[42rem] w-full rounded-[1.55rem] bg-teal object-contain"
                  width="1080"
                  height="1440"
                />
                <figcaption className={`${language === "tr" ? "mt-2" : "absolute inset-x-5 bottom-5"} flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/25 bg-coffee-deep/90 px-4 py-3 text-white backdrop-blur`}>
                  <span className="text-xs leading-5 text-white/70">{copy.limitedOffer}</span>
                  <strong className="text-sm leading-6">{copy.septemberOffer}</strong>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="hotels" className="scroll-mt-28 bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-9 grid gap-4 lg:grid-cols-[1fr_0.75fr] lg:items-end lg:gap-20">
              <div>
                <p className="eyebrow">{copy.stayEyebrow}</p>
                <h2 className="section-title mb-0">{copy.stayTitle}</h2>
              </div>
              <p className="m-0 text-sm leading-7 text-coffee/60 sm:text-base sm:leading-8">{copy.stayBody}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <HotelCard
                hotel="verta"
                image={hotelImages.verta}
                city={copy.makkah}
                label={copy.featuredHotel}
                name={copy.vertaName}
                description={copy.vertaDescription}
                amenities={[copy.breakfast, copy.haramTransfer, copy.service24]}
                whatsappLabel={copy.chooseHotel}
                whatsappHref={whatsappUrl(directMessage(language, "verta"))}
                mapLabel={copy.viewMap}
                mapHref={maps.verta}
              />
              <HotelCard
                hotel="rafahya"
                image={hotelImages.rafahya}
                city={language === "tr" ? "Mahbes Bölgesi" : copy.makkah}
                label={copy.featuredHotel}
                name={copy.rafahyaName}
                description={copy.rafahyaDescription}
                amenities={[copy.restaurant, copy.breakfast, copy.service24]}
                whatsappLabel={copy.chooseHotel}
                whatsappHref={whatsappUrl(directMessage(language, "rafahya"))}
                mapLabel={copy.viewMap}
                mapHref={maps.rafahya}
              />
            </div>
          </div>
        </section>

        <section id="offers" className="relative scroll-mt-28 overflow-hidden bg-teal py-16 text-white sm:py-24">
          <div className="absolute -bottom-36 -end-12 text-[20rem] font-black leading-none text-white/[0.035]" aria-hidden="true">
            96
          </div>
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-fawn">{copy.offerEyebrow}</p>
              <h2 className="font-display text-3xl font-black leading-[1.35] sm:text-5xl rtl:leading-[1.5]">{copy.offerTitle}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">{copy.offerBody}</p>
              <ul className="my-7 grid gap-3">
                {[copy.renovatedStay, copy.breakfastIncluded, copy.supportAnytime].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-extrabold">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-fawn text-coffee">
                      <Check size={15} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={directWhatsapp} target="_blank" rel="noopener noreferrer" className="primary-button bg-fawn text-coffee-deep hover:bg-[#edc98f]">
                <SiWhatsapp className="text-xl" aria-hidden="true" />
                {copy.getOffer}
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {(language === "tr"
                ? ["/assets/promo.jpeg", "/assets/verta-karim-tr.png"]
                : ["/assets/promo-3.jpeg", "/assets/promo.jpeg"]
              ).map((image, index) => (
                <figure
                  key={image}
                  className={`grid place-items-center rounded-4xl border border-white/15 bg-white/[0.07] p-2 shadow-2xl ${
                    index === 1 ? "sm:translate-y-8" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={copy.offerTitle}
                    className="max-h-[38rem] w-full rounded-[1.6rem] object-contain"
                    loading="lazy"
                    width="1080"
                    height="1440"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 bg-fawn-soft py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-8">
            <div>
              <p className="eyebrow">{copy.aboutEyebrow}</p>
              <h2 className="section-title">{copy.aboutTitle}</h2>
            </div>
            <div>
              <p className="max-w-3xl text-base leading-8 text-coffee/65 sm:text-lg sm:leading-9">{copy.aboutBody}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  [BedDouble, "01", copy.serviceHotelTitle, copy.serviceHotelBody],
                  [BusFront, "02", copy.serviceTransportTitle, copy.serviceTransportBody],
                  [UtensilsCrossed, "03", copy.serviceHospitalityTitle, copy.serviceHospitalityBody]
                ].map(([Icon, number, title, body]) => {
                  const ServiceIcon = Icon as typeof BedDouble;
                  return (
                    <article key={String(number)} className="rounded-3xl border border-olive/15 bg-paper/70 p-5">
                      <div className="mb-8 flex items-center justify-between text-olive">
                        <ServiceIcon size={22} aria-hidden="true" />
                        <span className="text-xs font-black">{String(number)}</span>
                      </div>
                      <h3 className="text-lg font-black leading-7 text-coffee">{String(title)}</h3>
                      <p className="mt-2 text-sm leading-7 text-coffee/60">{String(body)}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="reservation" className="scroll-mt-28 bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ReservationForm language={language} copy={copy} />
          </div>
        </section>
      </main>

      <footer id="contact" className="scroll-mt-28 bg-coffee-deep pt-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
          <div>
            <Brand light />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">{copy.footerIntro}</p>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-black uppercase tracking-[0.12em] text-fawn">{copy.contactTitle}</h2>
            <ul className="grid gap-3 text-sm text-white/75" dir="ltr">
              <li>
                <a className="inline-flex items-center gap-2 hover:text-fawn" href="tel:+966509530219">
                  <Phone size={15} /> +966 50 953 0219
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 hover:text-fawn" href="tel:+966574705030">
                  <Phone size={15} /> +966 57 470 5030
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 hover:text-fawn" href="tel:+905302600126">
                  <Phone size={15} /> +90 530 260 0126
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 break-all hover:text-fawn" href="mailto:rahlaalraha@gmail.com">
                  <Mail size={15} /> rahlaalraha@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-black uppercase tracking-[0.12em] text-fawn">{copy.followTitle}</h2>
            <SocialLinks />
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 py-6 text-xs leading-6 text-white/45 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            {copy.legalName} · {copy.crLabel} <span dir="ltr">7052180283</span> · {copy.vatLabel}{" "}
            <span dir="ltr">314325535500003</span>
          </p>
          <p>
            © {new Date().getFullYear()} {copy.rights}
          </p>
        </div>
      </footer>

      <a
        href={directWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.whatsapp}
        className="fixed bottom-4 end-4 z-40 grid h-14 w-14 place-items-center rounded-2xl bg-[#196b51] text-2xl text-white shadow-float transition hover:-translate-y-1 sm:bottom-6 sm:end-6 lg:flex lg:w-auto lg:gap-2 lg:rounded-full lg:px-5 lg:text-xl"
      >
        <SiWhatsapp aria-hidden="true" />
        <span className="hidden text-sm font-black lg:inline">{copy.whatsapp}</span>
      </a>
    </div>
  );
}

export default App;
