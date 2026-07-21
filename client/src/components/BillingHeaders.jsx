import { CreditCard } from 'lucide-react';
import { COLORS, FONTS, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { formatCurrency } from '../utils/billing';

function StatCard({ label, value, accent }) {
  return (
    <div
      className="min-w-[168px] flex-1 p-4 sm:p-5 sm:flex-none"
      style={{
        backgroundColor: COLORS.SURFACE,
        border: `1px solid ${COLORS.BORDER}`,
        boxShadow: SHADOWS.CARD,
        borderRadius: BORDER_RADIUS.LARGE,
      }}
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: COLORS.TEXT_SECONDARY, fontFamily: FONTS.BODY }}
      >
        {label}
      </p>
      <p
        className="mt-1.5 text-2xl font-semibold"
        style={{ color: accent ? COLORS.ACCENT : COLORS.TEXT_PRIMARY, fontFamily: FONTS.HEADING }}
      >
        {value}
      </p>
    </div>
  );
}

export default function BillingHeader({ activeBookingsCount, currentBillAmount }) {
  return (
    <div
      className="mb-4 sm:mb-8 p-4 sm:p-6 lg:p-8"
      style={{
        background: `linear-gradient(135deg, ${COLORS.PRIMARY}, #3B2D25)`,
        borderRadius: BORDER_RADIUS.LARGE,
        boxShadow: SHADOWS.CARD,
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
        {/* Left: icon + title (same structure as Admin Dashboard header) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 min-w-0">
          <div
            className="p-3 sm:p-4 shrink-0"
            style={{
              backgroundColor: COLORS.ACCENT,
              borderRadius: BORDER_RADIUS.LARGE,
            }}
          >
            <CreditCard size={28} className="sm:hidden" style={{ color: COLORS.PRIMARY }} />
            <CreditCard size={35} className="hidden sm:block" style={{ color: COLORS.PRIMARY }} />
          </div>

          <div className="min-w-0">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words"
              style={{
                color: '#fff',
                fontFamily: FONTS.HEADING,
              }}
            >
              Billing Management
            </h1>

            <p
              className="mt-2 text-sm sm:text-base"
              style={{
                color: COLORS.ACCENT,
                fontFamily: FONTS.BODY,
              }}
            >
              Generate invoices, manage charges, and track payment status.
            </p>
          </div>
        </div>

        {/* Right: stat cards */}
        <div className="flex gap-3 shrink-0">
          <StatCard label="Active Bookings" value={activeBookingsCount} />
          <StatCard label="Current Bill Amount" value={formatCurrency(currentBillAmount)} accent />
        </div>
      </div>
    </div>
  );
}