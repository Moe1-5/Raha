import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  BedDouble,
  BusFront,
  Building2,
  Plane,
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
import { HeroPoster, seasonCopy } from "./components/HeroPoster";
import { TravelServices, travelHeroCopy } from "./components/TravelServices";
import { HotelHighlights, MadinahHotels, ServicesInPictures } from "./components/MarketingSections";
import { ReservationForm } from "./components/ReservationForm";
import { SocialLinks } from "./components/SocialLinks";
import { getCopy, type Language } from "./i18n";
import { directMessage, type HotelKey, travelWhatsappUrl, whatsappUrl } from "./lib/whatsapp";

const maps = {
  verta:
    "https://www.google.com/maps?q=Verta+Hotel+Mahbas%2C+Mahbas+jin%2C+Alaziziyyah%2C+Makkah+24235&ftid=0x15c20591f74560dd:0x76b2c4bc6eaf53ef",
  rafahya:
    "https://maps.app.goo.gl/BmHga3nZ9fpf2VYb6",
  mirage:
    "https://www.google.com/maps?q=Meraj+Hotel+Taiba%2C+Madinah+42311&ftid=0x15bdbfaeb180d789:0x50cdb4833d80e78b"
} satisfies Partial<Record<HotelKey, string>>;

function initialLanguage(): Language {
  try {
    const stored = localStorage.getItem("rihlat-language");
    return stored === "en" || stored === "tr" ? stored : "ar";
  } catch { return "ar"; }
}

function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const copy = useMemo(() => getCopy(language), [language]);
  const directWhatsapp = whatsappUrl(directMessage(language));
  const travelHero = language === "tr";
  const heroContact = travelHero
    ? travelWhatsappUrl("Merhaba, grubumuz için uçuş ve otobüs organizasyonu hakkında bilgi almak istiyorum.")
    : directWhatsapp;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title =
      language === "ar"
        ? "رحلة الراحة | حجز فنادق مكة"
        : language === "tr"
          ? "Rihlat Al Raha | Mekke ve Medine Otelleri"
          : "Rihlat Al Raha | Makkah Hotels";
    try { localStorage.setItem("rihlat-language", language); } catch { /* Storage may be disabled. */ }
  }, [language]);

  const hotelImages = {
    verta: `/assets/production-posters/verta-${language === "tr" ? "tr" : "ar"}.png`,
    rafahya: `/assets/production-posters/rafahya-${language === "tr" ? "tr" : "ar"}.png`
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-porcelain text-coffee-deep">
      <Header language={language} onLanguageChange={setLanguage} copy={copy} />

      <main>
        <section id="top" className="relative overflow-hidden py-14 sm:py-20 lg:min-h-[44rem] lg:py-24">
          <div className="hero-grid-pattern absolute inset-y-0 start-0 w-72 opacity-40" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-fawn-soft/70 lg:inset-y-0 lg:start-auto lg:end-0 lg:h-auto lg:w-[38%]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20 lg:px-8">
            <div className="min-w-0">
              <div className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full bg-teal px-2 py-1.5 pe-4 text-xs font-black leading-5 text-white sm:text-sm">
                <Building2 className="mx-2 shrink-0" size={18} aria-hidden="true" />
                <span>{seasonCopy[language]}</span>
              </div>

              <p className="eyebrow">{travelHero ? travelHeroCopy.eyebrow : copy.heroEyebrow}</p>
              <h1 className="max-w-3xl font-display text-[clamp(2.45rem,11vw,4.25rem)] font-black leading-[1.28] tracking-[-0.02em] text-coffee-deep rtl:leading-[1.45] lg:text-[clamp(4rem,6vw,5.7rem)]">
                {travelHero ? travelHeroCopy.title : copy.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-coffee/65 sm:text-lg sm:leading-9">{travelHero ? travelHeroCopy.body : copy.heroBody}</p>

              <div className="hero-actions mt-8 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                <a
                  href={heroContact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button bg-[#196b51] hover:bg-[#125540]"
                >
                  <SiWhatsapp className="text-xl" aria-hidden="true" />
                  {travelHero ? travelHeroCopy.contact : copy.startRequest}
                </a>
                <a href={travelHero ? "#travel-services" : "#hotels"} className="secondary-button">
                  {travelHero ? travelHeroCopy.explore : copy.exploreHotels}
                  <ArrowDown size={18} aria-hidden="true" />
                </a>
              </div>

              <ul className="mt-9 grid gap-2 sm:flex sm:flex-wrap" aria-label="Highlights">
                {[
                  [travelHero ? Plane : Clock3, travelHero ? "Uçuş organizasyonu" : copy.service24],
                  [travelHero ? BusFront : Wifi, travelHero ? "Grup ulaşımı" : copy.freeWifi],
                  [Zap, travelHero ? "Hızlı iletişim" : copy.fastRequest]
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

            <HeroPoster language={language} copy={copy} />
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
                city={language === "tr" ? "Mahbes Bölgesi" : copy.makkah}
                label={copy.featuredHotel}
                name={copy.vertaName}
                description={copy.vertaDescription}
                amenities={language === "tr"
                  ? [copy.restaurant, copy.breakfast, copy.service24]
                  : [copy.breakfast, copy.haramTransfer, copy.service24]}
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

        <HotelHighlights language={language} copy={copy} />
        <MadinahHotels language={language} copy={copy} />

        {language === "tr" && <TravelServices />}

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

        <ServicesInPictures language={language} copy={copy} />

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
