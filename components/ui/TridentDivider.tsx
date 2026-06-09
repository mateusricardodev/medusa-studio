"use client";

interface TridentDividerProps {
  className?: string;
  label?: string;
}

export default function TridentDivider({ className = "", label }: TridentDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <div className="flex-1 h-px bg-[#2C2C33]" />
      <div className="flex items-center gap-2">
        <TridentSVG />
        {label && (
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#5A5B63] font-body">
            {label}
          </span>
        )}
      </div>
      <div className="flex-1 h-px bg-[#2C2C33]" />
    </div>
  );
}

export function TridentSVG({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2L12 22M12 2L9 6M12 2L15 6M6 4L6 10M18 4L18 10M6 4L4 7M6 4L8 7M18 4L16 7M18 4L20 7"
        stroke="#5A5B63"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
