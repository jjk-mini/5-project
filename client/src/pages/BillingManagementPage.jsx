import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import AsideBar from '../components/AsideBar';
import BillingHeader from '../components/BillingHeaders';
import SearchBar from '../components/SearchBar';
import BookingTable from '../components/BookingTable';
import EmptyState from '../components/EmptyState';
import BillingSummary from '../components/BillingSummary';
import SelectedBookingDetails from '../components/SelectedBookingDetails';
import CostBreakdown from '../components/CostBreakdown';
import SpecialRequestCard from '../components/SpecialRequestCard';
import BillingActions from '../components/BillingActions';
import InvoicePreviewModal from '../components/InvoicePreviewModal';
import InvoiceDocument from '../components/InvoiceDocument';
import billingApi from '../api/billingApi';
import { mapBillingToDashboardBooking } from '../utils/billingViewModel';
import { getRealBillingBreakdown } from '../utils/billing';


export default function BillingManagementPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [marking, setMarking] = useState(false);

  const printRef = useRef(null);

  const loadBillings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await billingApi.getAll();
      const records = res.data?.billings || [];
      setBookings(records.map(mapBillingToDashboardBooking));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load billing records.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBillings();
  }, [loadBillings]);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return bookings;
    return bookings.filter(
      (b) =>
        (b.invoiceNumber || '').toLowerCase().includes(query) ||
        (b.displayId || '').toLowerCase().includes(query) ||
        b.id.toLowerCase().includes(query) ||
        b.guestName.toLowerCase().includes(query) ||
        b.roomNumber.toLowerCase().includes(query)
    );
  }, [bookings, search]);

  const selectedBooking = useMemo(() => bookings.find((b) => b.id === selectedId) || null, [bookings, selectedId]);

  const breakdown = useMemo(() => getRealBillingBreakdown(selectedBooking), [selectedBooking]);

  const invoiceNumber = selectedBooking?.invoiceNumber || '';

  const showConfirmation = (message) => {
    setConfirmation(message);
    window.clearTimeout(showConfirmation._t);
    showConfirmation._t = window.setTimeout(() => setConfirmation(''), 2600);
  };

  const handleViewInvoice = () => {
    if (!selectedBooking) return;
    setModalOpen(true);
  };

  // Records a real cash payment at the front desk. This calls the exact same
  // backend endpoint the guest's own Billing Page uses, so payment status
  // updates automatically everywhere (booking, billing, invoice) — nothing
  // here is a fake local status flip, and the backend still rejects it if
  // the bill was already paid.
  const handleMarkPaid = async () => {
    if (!selectedBooking || selectedBooking.paymentStatusRaw === 'paid') return;
    setMarking(true);
    try {
      await billingApi.pay(selectedBooking.billingId, { paymentMethod: 'cash' });
      await loadBillings();
      showConfirmation('Payment recorded — booking marked as paid.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not record payment.');
    } finally {
      setMarking(false);
    }
  };

  const handlePrint = () => {
    if (!selectedBooking) return;
    window.requestAnimationFrame(() => window.print());
  };

  const handleDownloadPdf = async () => {
    if (!selectedBooking || !printRef.current) return;
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      // Size the PDF page to exactly match the rendered invoice height (in mm)
      // instead of a fixed A4 page — this is what guarantees the invoice
      // always fits on a single page with no overflow and no blank trailing
      // pages, regardless of how many charge lines or how long the special
      // request text is.
      const node = printRef.current;
      const pxToMm = (px) => (px * 25.4) / 96;
      const widthMm = pxToMm(node.offsetWidth);
      const heightMm = pxToMm(node.scrollHeight);

      await html2pdf()
        .set({
          margin: 0,
          filename: `${invoiceNumber}-${selectedBooking.guestName.replace(/\s+/g, '-')}.pdf`,
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: [widthMm, heightMm], orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all'] },
        })
        .from(node)
        .save();
      showConfirmation('Invoice PDF downloaded.');
    } catch (err) {
      showConfirmation('Could not generate the PDF. Please try again.');
    }
  };

  const activeBookingsCount = bookings.length;
  const currentBillAmount = breakdown ? breakdown.grandTotal : 0;

  return (
    <div className="flex min-h-screen bg-background">
      <AsideBar />
      <div className="flex-1 mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
        <BillingHeader activeBookingsCount={activeBookingsCount} currentBillAmount={currentBillAmount} />

        {error && (
          <p className="mt-6 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 font-body text-sm text-danger">
            {error}
          </p>
        )}

        <main className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-10">
          {/* Left column — 70% */}
          <div className="lg:col-span-7">
            <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-ink">Billed Bookings</h2>
                <span className="font-body text-xs font-medium text-ink/40">
                  {loading ? 'Loading…' : `${filteredBookings.length} of ${bookings.length}`}
                </span>
              </div>
              <div className="mt-4">
                <SearchBar value={search} onChange={setSearch} />
              </div>
              <div className="mt-5">
                {loading ? (
                  <div className="rounded-xl border border-dashed border-border py-14 text-center">
                    <p className="font-body text-sm text-ink/50">Loading billing records…</p>
                  </div>
                ) : (
                  <BookingTable bookings={filteredBookings} selectedId={selectedId} onSelect={setSelectedId} />
                )}
              </div>
            </section>

            {selectedBooking && (
              <div className="mt-6">
                <SelectedBookingDetails booking={selectedBooking} breakdown={breakdown} />
              </div>
            )}
          </div>

          {/* Right column — 30% */}
          <div className="lg:col-span-3">
            <div className="flex flex-col gap-6">
              {selectedBooking ? (
                <>
                  <BillingSummary booking={selectedBooking} breakdown={breakdown} />
                  <SpecialRequestCard booking={selectedBooking} />
                  <CostBreakdown booking={selectedBooking} breakdown={breakdown} />
                  <BillingActions
                    disabled={!selectedBooking}
                    isPaid={selectedBooking.paymentStatusRaw === 'paid'}
                    marking={marking}
                    onViewInvoice={handleViewInvoice}
                    onMarkPaid={handleMarkPaid}
                    onPrint={handlePrint}
                    onDownloadPdf={handleDownloadPdf}
                  />
                  {confirmation && (
                    <p className="-mt-3 rounded-xl bg-success/10 px-4 py-2.5 text-center font-body text-xs font-medium text-success animate-fadeIn">
                      {confirmation}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <EmptyState />
                  <SpecialRequestCard booking={null} />
                  <BillingActions disabled isPaid={false} onViewInvoice={() => {}} onMarkPaid={() => {}} onPrint={() => {}} onDownloadPdf={() => {}} />
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      <InvoicePreviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        booking={selectedBooking}
        breakdown={breakdown}
        invoiceNumber={invoiceNumber}
        onPrint={handlePrint}
        onDownloadPdf={handleDownloadPdf}
      />

      {/* Off-screen printable/PDF source, always mirrors the selected booking's invoice */}
      {selectedBooking && (
        <div
          id="invoice-printable"
          ref={printRef}
          className="pointer-events-none fixed left-[-9999px] top-0 w-[794px]"
          aria-hidden="true"
        >
          <InvoiceDocument booking={selectedBooking} breakdown={breakdown} invoiceNumber={invoiceNumber} />
        </div>
      )}
    </div>
  );
}
