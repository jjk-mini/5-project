const ICONS = {
  view: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </>
  ),
  paid: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />,
  print: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0020.999 15.75v-4.5A2.25 2.25 0 0018.75 9H5.25a2.25 2.25 0 00-2.25 2.25v4.5A2.25 2.25 0 005.25 18h1.091M6.75 6h10.5v3.75H6.75V6z"
    />
  ),
  download: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
    />
  ),
};

function ActionButton({ icon, label, onClick, disabled, variant = 'outline' }) {
  const base =
    'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-body text-sm font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100';
  const variants = {
    primary: 'bg-primary text-white shadow-soft hover:bg-primary-dark',
    outline: 'border border-border bg-card text-ink hover:border-primary-light hover:text-primary',
    success: 'bg-success/10 text-success border border-success/30 hover:bg-success/15',
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {icon}
      </svg>
      {label}
    </button>
  );
}

export default function BillingActions({ disabled, isPaid, marking, onViewInvoice, onMarkPaid, onPrint, onDownloadPdf }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft animate-fadeIn">
      <h3 className="font-display text-lg font-semibold text-ink">Billing Actions</h3>
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <ActionButton icon={ICONS.view} label="View Invoice" onClick={onViewInvoice} disabled={disabled} variant="primary" />
        <ActionButton
          icon={ICONS.paid}
          label={isPaid ? 'Paid' : marking ? 'Recording…' : 'Record Cash Payment'}
          onClick={onMarkPaid}
          disabled={disabled || isPaid || marking}
          variant="success"
        />
        <ActionButton icon={ICONS.print} label="Print Invoice" onClick={onPrint} disabled={disabled} />
        <ActionButton
          icon={ICONS.download}
          label="Download PDF"
          onClick={onDownloadPdf}
          disabled={disabled}
        />
      </div>
    </section>
  );
}