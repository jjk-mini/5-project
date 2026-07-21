// Status label constants only — not sourced from any dummy/sample data.
// Real status strings always come from the backend (billingViewModel.js
// normalizes 'paid' -> 'Paid' and everything else -> 'Pending').
const PAYMENT_STATUSES = {
  PAID: 'Paid',
  PENDING: 'Pending',
  PARTIAL: 'Partially Paid',
};

const STYLES = {
  [PAYMENT_STATUSES.PAID]: 'bg-success/10 text-success border-success/30',
  [PAYMENT_STATUSES.PENDING]: 'bg-danger/10 text-danger border-danger/30',
  [PAYMENT_STATUSES.PARTIAL]: 'bg-warning/10 text-warning border-warning/30',
};

const DOT_STYLES = {
  [PAYMENT_STATUSES.PAID]: 'bg-success',
  [PAYMENT_STATUSES.PENDING]: 'bg-danger',
  [PAYMENT_STATUSES.PARTIAL]: 'bg-warning',
};

/**
 * Small pill badge that communicates payment status at a glance.
 * `inverted` renders a version legible on the dark maroon summary card.
 */
export default function BillingStatusBadge({ status, inverted = false }) {
  if (inverted) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
        <span className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[status] || 'bg-white'}`} />
        {status}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${
        STYLES[status] || 'bg-ink/5 text-ink border-border'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[status] || 'bg-ink/40'}`} />
      {status}
    </span>
  );
}