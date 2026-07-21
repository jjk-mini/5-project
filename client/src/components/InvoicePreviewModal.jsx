import InvoiceDocument from './InvoiceDocument';

export default function InvoicePreviewModal({ open, onClose, booking, breakdown, invoiceNumber, onPrint, onDownloadPdf }) {
  if (!open || !booking) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-lift animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white/95 px-6 py-4 backdrop-blur">
          <h3 className="font-display text-lg font-semibold text-ink">Invoice Preview</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrint}
              className="rounded-lg border border-border px-3 py-1.5 font-body text-xs font-semibold text-ink/70 transition-colors hover:border-primary-light hover:text-primary"
            >
              Print
            </button>
            <button
              onClick={onDownloadPdf}
              className="rounded-lg border border-border px-3 py-1.5 font-body text-xs font-semibold text-ink/70 transition-colors hover:border-primary-light hover:text-primary"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-ink/5 hover:text-ink"
              aria-label="Close invoice preview"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <InvoiceDocument booking={booking} breakdown={breakdown} invoiceNumber={invoiceNumber} />
      </div>
    </div>
  );
}