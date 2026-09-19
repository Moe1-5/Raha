interface BrandProps {
  light?: boolean;
}

export function Brand({ light = false }: BrandProps) {
  return (
    <a href="#top" className="inline-flex shrink-0 items-center gap-3" aria-label="Rihlat Al Raha">
      <span
        className={`grid h-11 w-11 place-items-center rounded-2xl sm:h-12 sm:w-12 ${
          light ? "bg-fawn" : "bg-coffee"
        }`}
        aria-hidden="true"
      >
        <svg className="h-8 w-8" viewBox="0 0 56 56" fill="none">
          <path
            d="M10 39V21l18-10 18 10v18M18 39V25l10-6 10 6v14M7 44h42"
            stroke={light ? "#3d2b1f" : "#e1bb80"}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <strong className={`text-sm font-black sm:text-base ${light ? "text-white" : "text-coffee"}`}>
          رحلة الراحة
        </strong>
        <small
          className={`mt-1 text-[0.54rem] font-extrabold tracking-[0.17em] sm:text-[0.6rem] ${
            light ? "text-fawn" : "text-olive"
          }`}
          dir="ltr"
        >
          RIHLAT AL RAHA
        </small>
      </span>
    </a>
  );
}
