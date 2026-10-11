import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, existsSync } from "node:fs";
import App from "../src/App";
import { getCopy, type Language } from "../src/i18n";
import { HeroPoster, HERO_INTERVAL_MS, heroSlides } from "../src/components/HeroPoster";
import { HotelCard } from "../src/components/HotelCard";
import { travelWhatsappUrl, whatsappUrl } from "../src/lib/whatsapp";

function page(language: Language) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: () => language, setItem: () => {} } });
  try { return renderToStaticMarkup(<App />); }
  finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
}

describe("Production design and requested marketing changes", () => {
  for (const language of ["ar", "en", "tr"] as const) {
    test(`${language}: all original sections and photos are preserved`, () => {
      const markup = page(language);
      for (const id of ["hotels", "hotel-photos", "madinah-hotels", "about", "services-in-pictures", "reservation", "contact"]) expect(markup).toContain(`id="${id}"`);
      for (const image of ["verta-room", "verta-buffet", "rafahya-room", "raf-buffet", "rafahya-lobby", "miraj-taiba", "diwan-al-hijrah", "arjwan-rose", "abraj-tabah", "welcome", "transport"]) {
        expect(markup).toContain(`/assets/marketing/${image}.jpg`);
        expect(existsSync(`public/assets/marketing/${image}.jpg`)).toBe(true);
      }
      expect(markup).toContain("/assets/rihlat-al-raha-logo.jpeg");
      expect(markup).toContain("/assets/rfm-group-logo.png");
      expect(markup).toContain("max-w-7xl");
      expect(markup).not.toContain("promo.jpeg");
      expect(markup).not.toContain("promo-tyr-2.jpeg");
      expect(markup).not.toContain("Sınırlı dönem kampanyası");
      expect(markup).not.toContain("عرض اليوم الوطني");
    });
    test(`${language}: flights and bus promotion appears only in Turkish`, () => {
      const markup = page(language);
      expect(markup.includes('id="travel-services"')).toBe(language === "tr");
      expect(markup.includes('href="#travel-services"')).toBe(language === "tr");
      expect(markup).toContain(`/assets/production-posters/verta-${language === "tr" ? "tr" : "ar"}.png`);
      expect(markup).toContain(`/assets/production-posters/rafahya-${language === "tr" ? "tr" : "ar"}.png`);
    });
  }

  test("Turkish hero has two travel slides, one visible image and a five-second interval", () => {
    const copy = getCopy("tr"), slides = heroSlides("tr", copy);
    expect(slides.map(slide => slide.src)).toEqual(["/assets/production-posters/flights-tr.png", "/assets/production-posters/bus-tr.png"]);
    expect(HERO_INTERVAL_MS).toBe(5000);
    const markup = renderToStaticMarkup(<HeroPoster language="tr" copy={copy} />);
    expect(markup.match(/aria-hidden="false"/g)?.length).toBe(1);
    expect(markup).not.toContain("<button");
    expect(heroSlides("ar", getCopy("ar"))).toHaveLength(1);
  });

  test("rooms keep their original WhatsApp contact; travel uses the new number", () => {
    expect(new URL(whatsappUrl("Room test")).pathname).toBe("/966509530219");
    expect(new URL(travelWhatsappUrl("Travel test")).pathname).toBe("/905547490137");
    const markup = page("tr");
    const hotelSection = markup.split('id="hotels"')[1].split('id="hotel-photos"')[0];
    expect(hotelSection).toContain("wa.me/966509530219");
    expect(hotelSection).not.toContain("wa.me/905547490137");
    expect(hotelSection).toContain("Rafahya Al Karam");
    expect(hotelSection).not.toContain("Mirage Taiba");
  });

  test("hotel artwork fills its frame without green margins", () => {
    const markup = renderToStaticMarkup(<HotelCard hotel="verta" image="verta.png" city="Makkah" label="Hotel" name="Verta" description="Hotel" amenities={[]} whatsappLabel="Ask" whatsappHref={whatsappUrl("Test")} mapLabel="Map" mapHref="https://maps.google.com" />);
    expect(markup).toContain("absolute inset-0 h-full w-full object-cover object-top");
    expect(markup).not.toContain("from-teal");
  });

  test("original Cairo typography and production sizing are retained", () => {
    expect(readFileSync("index.html", "utf8")).toContain("family=Cairo");
    expect(readFileSync("src/index.css", "utf8")).toContain("font-family: Cairo, Arial, sans-serif");
    expect(readFileSync("src/App.tsx", "utf8")).toContain("lg:text-[clamp(4rem,6vw,5.7rem)]");
    expect(readFileSync("src/components/HeroPoster.tsx", "utf8")).toContain("max-w-[28rem]");
  });

  test("all supplied poster files are packaged", () => {
    for (const name of ["verta-ar", "verta-tr", "rafahya-ar", "rafahya-tr", "flights-tr", "bus-tr"]) expect(existsSync(`public/assets/production-posters/${name}.png`)).toBe(true);
  });
});
