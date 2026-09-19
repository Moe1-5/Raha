interface BrandProps {
  light?: boolean;
}

export function Brand({ light = false }: BrandProps) {
  return (
    <a href="#top" className="inline-flex shrink-0 items-center" aria-label="Rihlat Al Raha">
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
    </a>
  );
}
