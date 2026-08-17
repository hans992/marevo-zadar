import { BRAND_NAME } from "@/lib/brand";

export function Logo({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "light";
}) {
  const color = tone === "light" ? "text-background" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-2.5 ${color} ${className}`}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6 shrink-0">
        <circle cx="16" cy="12.5" r="6" className="fill-sun" />
        <path
          d="M2 22c3.2 0 3.2 2.6 6.4 2.6S11.6 22 14.8 22s3.2 2.6 6.4 2.6S24.4 22 27.6 22c1.3 0 2 .43 2.7.93"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="wordmark whitespace-nowrap text-[0.95rem] leading-none sm:text-[1.05rem]">
        {BRAND_NAME}
      </span>
    </span>
  );
}
