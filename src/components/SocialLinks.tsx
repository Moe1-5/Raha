import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiSnapchat,
  SiTiktok,
  SiX
} from "react-icons/si";

const links = [
  { label: "Instagram", href: "https://www.instagram.com/rahlaalraha", icon: SiInstagram },
  { label: "Snapchat", href: "https://snapchat.com/t/jAqYkGsy", icon: SiSnapchat },
  { label: "TikTok", href: "https://www.tiktok.com/@rahlaalraha", icon: SiTiktok },
  { label: "X", href: "https://x.com/rahlaalraha", icon: SiX },
  { label: "Facebook", href: "https://www.facebook.com/share/19iVYPbXZr/", icon: SiFacebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rahla-al-raha-991852435", icon: SiLinkedin }
];

export function SocialLinks() {
  return (
    <div className="grid grid-cols-6 gap-2" dir="ltr">
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="grid h-11 w-11 place-items-center rounded-xl border border-fawn/30 bg-white/5 text-lg text-white/80 transition hover:-translate-y-0.5 hover:bg-fawn hover:text-coffee-deep"
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
