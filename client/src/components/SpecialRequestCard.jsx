import { COLORS } from '../constants/theme';

// Shared wrapper so all three states share the same card chrome, spacing,
// and entrance animation.
function CardShell({ children }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-card animate-fadeIn">
      {children}
    </section>
  );
}

function IllustrationRing({ children }) {
  return (
    <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/[0.07]">
      <div className="absolute inset-0 rounded-full border border-primary/15" />
      {children}
    </div>
  );
}

function NoBookingSelected() {
  return (
    <CardShell>
      <div className="flex flex-col items-center py-4 text-center">
        <IllustrationRing>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={COLORS.PRIMARY} strokeWidth="1.4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 21V9.5a1 1 0 01.4-.8l8-6a1 1 0 011.2 0l8 6a1 1 0 01.4.8V21"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-6a1 1 0 011-1h4a1 1 0 011 1v6" />
          </svg>
        </IllustrationRing>
        <h3 className="font-display text-lg font-semibold text-ink">No Booking Selected</h3>
        <p className="mt-1.5 max-w-[240px] font-body text-sm leading-relaxed text-ink/55">
          Please select a booking to view the guest&rsquo;s special request.
        </p>
      </div>
    </CardShell>
  );
}

function NoSpecialRequest() {
  return (
    <CardShell>
      <div className="flex flex-col items-center py-4 text-center">
        <IllustrationRing>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={COLORS.PRIMARY} strokeWidth="1.4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </IllustrationRing>
        <h3 className="font-display text-lg font-semibold text-ink">No Special Request</h3>
        <p className="mt-1.5 max-w-[260px] font-body text-sm leading-relaxed text-ink/55">
          This guest has not submitted any special requests for this booking.
        </p>
      </div>
    </CardShell>
  );
}

// Special requests are shown purely as information — exactly what the guest
// typed when they booked — with no approval/rejection workflow or status
// field layered on top.
function RequestDetails({ text }) {
  return (
    <CardShell>
      <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
        Special Request
      </p>
      <p className="mt-2 font-body text-sm leading-relaxed text-ink/70 whitespace-pre-wrap">{text}</p>
    </CardShell>
  );
}

/**
 * Always-visible Special Request card for the right-hand billing panel.
 * `booking` may be:
 *  - null / undefined  -> "no booking selected" state
 *  - a booking with an empty `specialRequest` string -> "no special request" state
 *  - a booking with `specialRequest` text -> shows it as plain information
 *
 * Driven entirely by the real booking's `specialRequests` field saved in
 * MongoDB — no dummy data, no status/approval workflow.
 */
export default function SpecialRequestCard({ booking }) {
  if (!booking) return <NoBookingSelected />;
  if (!booking.specialRequest) return <NoSpecialRequest />;
  return <RequestDetails text={booking.specialRequest} />;
}