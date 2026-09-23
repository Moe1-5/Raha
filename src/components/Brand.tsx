interface BrandProps {
  light?: boolean;
}

export function Brand({ light = false }: BrandProps) {
  return (
    <a href="#top" className="inline-flex shrink-0 items-center gap-2" aria-label="Rihlat Al Raha and RFM Group">
      <span
        className={`block h-14 w-14 overflow-hidden rounded-2xl sm:h-16 sm:w-16 ${
          light ? "ring-1 ring-fawn/30" : "ring-1 ring-coffee/10"
        }`}
      >
        <img
          src="/assets/rihlat-al-raha-logo.jpeg"
          alt="Rihlat Al Raha"
          className="h-full w-full scale-[1.16] object-cover"
          width="1290"
          height="1290"
        />
      </span>
      <span
        className={`grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-white p-1.5 sm:h-16 sm:w-16 ${
          light ? "ring-1 ring-fawn/30" : "ring-1 ring-coffee/10"
        }`}
      >
        <img
          src="/assets/rfm-group-logo.png"
          alt="RFM Group"
          className="h-full w-full object-contain"
          width="513"
          height="640"
        />
      </span>
    </a>
  );
}
