export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-primary/25 bg-gradient-to-b from-primary/[0.04] to-transparent px-8 py-16 text-center animate-fadeIn">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/[0.07]">
        <div className="absolute inset-0 rounded-full border border-primary/15" />
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className="text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 21V9.5a1 1 0 01.4-.8l8-6a1 1 0 011.2 0l8 6a1 1 0 01.4.8V21"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-6a1 1 0 011-1h4a1 1 0 011 1v6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 11h.01M15 11h.01M9 7h.01M15 7h.01" />
        </svg>
      </div>
      <h3 className="font-display text-xl font-semibold text-ink">No Booking Selected</h3>
      <p className="mt-2 max-w-[280px] font-body text-sm leading-relaxed text-ink/55">
        Select a booking from the table to view billing details, generate invoices, and manage payments.
      </p>
    </div>
  );
}