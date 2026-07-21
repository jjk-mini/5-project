import BillingStatusBadge from './BillingStatusBadge';
import { formatCurrency } from '../utils/billing';

function Line({ label, value, isTotal = false, isDiscount = false }) {
  return (
    <div
      className={`flex items-center justify-between ${
        isTotal ? 'border-t border-border pt-3 mt-2' : 'py-1.5'
      }`}
    >
      <span
        className={`font-body ${
          isTotal ? 'text-sm font-semibold text-ink' : 'text-sm text-ink/60'
        }`}
      >
        {label}
      </span>
      <span
        className={`font-mono ${
          isTotal
            ? 'text-lg font-bold text-primary'
            : isDiscount
              ? 'text-sm font-medium text-success'
              : 'text-sm font-medium text-ink'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function CostBreakdown({ booking, breakdown }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-ink">Cost Breakdown</h3>
        <BillingStatusBadge status={booking.paymentStatus} />
      </div>

      <div className="mt-3">
        {breakdown.charges.map((charge, index) => (
          <Line key={`${charge.label}-${index}`} label={charge.label} value={formatCurrency(charge.amount)} />
        ))}
        <Line
          label={`Tax${breakdown.taxRateLabel ? ` (${breakdown.taxRateLabel})` : ''}`}
          value={formatCurrency(breakdown.tax)}
        />
        {breakdown.discount > 0 && (
          <Line label="Discount" value={`- ${formatCurrency(breakdown.discount)}`} isDiscount />
        )}
        <Line label="Grand Total" value={formatCurrency(breakdown.grandTotal)} isTotal />
      </div>
    </section>
  );
}