import { useEffect, useRef, useState } from "react";
import type { Copy, Language } from "../i18n";

export const HERO_INTERVAL_MS = 5000;
export const seasonCopy = {
  ar: "نستقبل طلباتكم طوال الموسم",
  en: "Welcoming reservations throughout the season",
  tr: "Sezon boyu taleplerinizi bekliyoruz"
};

export function heroSlides(language: Language, copy: Copy) {
  return language === "tr"
    ? [
        { src: "/assets/production-posters/flights-tr.png", label: "Uçuş hizmetleri" },
        { src: "/assets/production-posters/bus-tr.png", label: "Otobüs hizmetleri" }
      ]
    : [{ src: "/assets/production-posters/verta-ar.png", label: copy.vertaName }];
}

export function HeroPoster({ language, copy }: { language: Language; copy: Copy }) {
  const slides = heroSlides(language, copy);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const frame = useRef<HTMLDivElement>(null);
  const activeIndex = index % slides.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    if (frame.current) observer.observe(frame.current);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => setIndex(0), [language]);
  useEffect(() => {
    if (language !== "tr" || hovered || focused || !visible || !inView || reducedMotion) return;
    const timer = window.setInterval(() => setIndex(value => (value + 1) % 2), HERO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [language, hovered, focused, visible, inView, reducedMotion]);

  return (
    <div className="relative mx-auto w-full max-w-[28rem]" data-hero-poster>
      <div className="absolute -inset-3 translate-x-2 translate-y-4 rounded-4xl border-2 border-fawn" aria-hidden="true" />
      <figure className="relative rounded-4xl bg-paper p-2.5 shadow-card sm:p-3">
        <div
          ref={frame}
          className="relative grid overflow-hidden rounded-[1.55rem] bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-fawn"
          tabIndex={language === "tr" ? 0 : -1}
          aria-describedby={language === "tr" ? "hero-slider-help" : undefined}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          {slides.map((slide, position) => (
            <img key={slide.src} src={slide.src} alt={slide.label} aria-hidden={position !== activeIndex}
              className={`col-start-1 row-start-1 aspect-[3/4] w-full object-contain transition-[opacity,transform] duration-700 motion-reduce:transition-none ${position === activeIndex ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
              width="1080" height="1440" />
          ))}
        </div>
        {language === "tr" && <p id="hero-slider-help" className="sr-only">Görseller her beş saniyede bir değişir. Duraklatmak için görsele odaklanın veya üzerine gelin.</p>}
        <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/25 bg-coffee-deep/90 px-4 py-3 text-white">
          <span className="text-xs leading-5 text-white/70">{seasonCopy[language]}</span>
          <strong className="text-sm leading-6">{slides[activeIndex].label}</strong>
        </figcaption>
      </figure>
    </div>
  );
}
