import { Menu, X } from "lucide-react";
import { useState } from "react";
import { languages, type Language } from "../i18n";
import { Brand } from "./Brand";

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  copy: {
    menu: string;
    closeMenu: string;
    navHome: string;
    navHotels: string;
    navOffers: string;
    navAbout: string;
    navContact: string;
  };
}

export function Header({ language, onLanguageChange, copy }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const navItems = [
    ["#top", copy.navHome],
    ["#hotels", copy.navHotels],
    ["#offers", copy.navOffers],
    ["#about", copy.navAbout],
    ["#contact", copy.navContact]
  ];

  return (
    <>
      <div className="border-b border-white/10 bg-coffee-deep text-white">
        <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a className="text-xs font-bold tracking-wide hover:text-fawn" href="tel:+966509530219" dir="ltr">
            +966 50 953 0219
          </a>
          <div className="flex items-center gap-1" role="group" aria-label="Language">
            {languages.map((item) => {
              const active = language === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  aria-pressed={active}
                  title={item.label}
                  onClick={() => onLanguageChange(item.code)}
                  className={`grid min-h-8 min-w-9 place-items-center rounded-full px-2 text-[0.7rem] font-black transition ${
                    active ? "bg-fawn text-coffee-deep" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-coffee/10 bg-porcelain/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:min-h-[5.25rem] lg:px-8">
          <Brand />

          <nav className="hidden items-center gap-8 text-sm font-extrabold text-olive lg:flex" aria-label="Primary">
            {navItems.map(([href, label]) => (
              <a key={href} href={href} className="transition hover:text-coffee">
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-coffee/15 bg-paper text-coffee lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? copy.closeMenu : copy.menu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <nav
            id="mobile-navigation"
            className="absolute inset-x-4 top-[calc(100%+0.5rem)] grid gap-1 rounded-3xl border border-coffee/10 bg-paper p-3 shadow-card lg:hidden"
            aria-label="Mobile"
          >
            {navItems.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-black text-coffee transition hover:bg-fawn-soft"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
