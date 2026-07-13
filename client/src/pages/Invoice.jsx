import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { COLORS } from "../constants/theme";

const Invoice = ({ booking, onClose, autoDownload = false }) => {
  const [downloading, setDownloading] = useState(false);
  const generatePdf = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" }); // 595 x 842 pt
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    let y = 50;

    const primary = COLORS?.PRIMARY || "#1d4ed8";
    const textPrimary = COLORS?.TEXT_PRIMARY || "#111111";
    const textSecondary = COLORS?.TEXT_SECONDARY || "#555555";
    const success = COLORS?.SUCCESS || "#16a34a";

    // Header band
    doc.setFillColor(primary);
    doc.rect(0, 0, pageWidth, 70, "F");
    doc.setTextColor("#FFFFFF");
    doc.setFontSize(20);
    doc.setFont(undefined, "bold");
    doc.text("INVOICE", margin, 40);
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.text(booking?.hotelName || "Royal Palace Hotel & Resort", margin, 58);

    y = 100;
    doc.setTextColor(textPrimary);

    // Guest info (left) + Booking info (right)
    const colWidth = (pageWidth - margin * 2 - 20) / 2;
    const leftX = margin;
    const rightX = margin + colWidth + 20;

    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.setTextColor(primary);
    doc.text("Guest Information", leftX, y);
    doc.text("Booking Details", rightX, y);

    y += 16;
    doc.setFont(undefined, "normal");
    doc.setTextColor(textPrimary);
    doc.setFontSize(11);
    doc.text(booking?.guestName || "Guest", leftX, y);
    doc.text(booking?.roomType || "Room", rightX, y);

    y += 14;
    doc.setFontSize(9);
    doc.setTextColor(textSecondary);
    doc.text(`Room #${booking?.roomNumber || ""}`, leftX, y);
    doc.text(`Room #${booking?.roomNumber || ""}`, rightX, y);

    y += 14;
    doc.text(`Booking ID: ${booking?.bookingId || "-"}`, leftX, y);
    doc.text(
      `${booking?.checkInDate || ""} - ${booking?.checkOutDate || ""}`,
      rightX,
      y
    );

    y += 14;
    doc.text(`Invoice: ${booking?.invoiceNumber || "-"}`, leftX, y);
    doc.text(`${booking?.totalNights || ""}`, rightX, y);

    y += 14;
    doc.text(`Date: ${booking?.billingDate || "-"}`, leftX, y);

    y += 30;

    // Itemized table
    const rows = [
      [`Room Charges (${booking?.roomType || ""})`, booking?.roomCharges],
      ["Room Service", booking?.roomService],
      ["Laundry Service", booking?.laundry],
      ["Food & Beverages", booking?.food],
      ["Airport Pickup", booking?.airportPickup],
    ].filter((r) => r[1] !== undefined);

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, y, pageWidth - margin * 2, 22, "F");
    doc.setFont(undefined, "bold");
    doc.setFontSize(10);
    doc.setTextColor(textPrimary);
    doc.text("Description", margin + 8, y + 15);
    doc.text("Amount (PKR)", pageWidth - margin - 8, y + 15, { align: "right" });
    y += 22;

    doc.setFont(undefined, "normal");
    rows.forEach(([label, amount]) => {
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, y, pageWidth - margin, y);
      doc.text(String(label), margin + 8, y + 16);
      doc.text(`PKR ${amount}`, pageWidth - margin - 8, y + 16, {
        align: "right",
      });
      y += 22;
    });

    doc.setDrawColor(0, 0, 0);
    doc.rect(margin, y - rows.length * 22 - 22, pageWidth - margin * 2, rows.length * 22 + 22);

    y += 20;

    // Summary box
    const summaryX = pageWidth - margin - 200;
    const line = (label, value, opts = {}) => {
      doc.setFontSize(10);
      doc.setTextColor(opts.color || textSecondary);
      doc.setFont(undefined, opts.bold ? "bold" : "normal");
      doc.text(label, summaryX, y);
      doc.text(String(value), pageWidth - margin - 8, y, { align: "right" });
      y += 18;
    };

    line("Subtotal", `PKR ${booking?.subtotal || "0"}`);
    line("Tax", `PKR ${booking?.tax || "0"}`);
    line("Discount", `- PKR ${booking?.discount || "0"}`, { color: success });

    doc.setDrawColor(200, 200, 200);
    doc.line(summaryX, y - 4, pageWidth - margin, y - 4);
    y += 10;

    doc.setFontSize(13);
    doc.setTextColor(primary);
    doc.setFont(undefined, "bold");
    doc.text("Grand Total", summaryX, y);
    doc.text(`PKR ${booking?.grandTotal || "0"}`, pageWidth - margin - 8, y, {
      align: "right",
    });

    y += 40;
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.setTextColor(textSecondary);
    doc.text(`Payment Status: ${booking?.paymentStatus || "-"}`, margin, y);
    y += 14;
    doc.text(`Payment Method: ${booking?.paymentMethod || "-"}`, margin, y);

    const invoiceNumber =
      booking?.invoiceNumber || booking?.bookingId || "invoice";
    doc.save(`${invoiceNumber}.pdf`);
  };

  const handleDownload = () => {
    setDownloading(true);
    try {
      generatePdf();
    } catch (err) {
      console.error("Invoice download failed:", err);
      alert("PDF download failed: " + (err?.message || err));
    } finally {
      setDownloading(false);
      if (autoDownload && onClose) onClose();
    }
  };

  React.useEffect(() => {
    if (autoDownload) {
      handleDownload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When opened purely to auto-download, never render the visible modal at all.
  if (autoDownload) return null;

  return (
    <>
      {/* Dynamic Print Fix CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
            height: auto !important;
            overflow: visible !important;
          }
          .printable-invoice-modal, .printable-invoice-modal * {
            visibility: visible;
          }
          .printable-invoice-modal {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 100% !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            page-break-after: avoid;
            page-break-inside: avoid;
          }
          html, body {
            content: none !important;
            height: 100% !important;
            overflow: hidden !important;
          }
          /* Force grid columns to stay side-by-side on paper */
          .print\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1xl)) !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}} />

      {/* BACKDROP */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">

        {/* MODAL */}
        <div
          className="printable-invoice-modal w-full max-w-2xl rounded-xl relative max-h-[95vh] overflow-y-auto"
          style={{ backgroundColor: COLORS.SURFACE, boxShadow: COLORS.CARD }}
        >

          {/* HEADER */}
          <div className="text-white px-4 sm:px-6 py-4 relative" style={{ backgroundColor: COLORS.PRIMARY }}>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-xs print:hidden"
            >
              ✕
            </button>

            <h1 className="text-base sm:text-xl font-bold">INVOICE</h1>
            <p className="text-xs sm:text-sm text-white/80">
              {booking?.hotelName || "Royal Palace Hotel & Resort"}
            </p>
          </div>

          {/* BODY */}
          <div className="p-3 sm:p-5 space-y-4 sm:space-y-5" style={{ color: COLORS.TEXT_PRIMARY }}>

            {/* TOP GRID WITH WHITE BACKGROUND & SHADOW CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

              {/* BILL - WHITE CARD WITH SHADOW */}
              <div
                className="p-3 sm:p-4 rounded-lg text-xs sm:text-sm shadow-sm"
                style={{ backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.DARK}` }}
              >
                <h2
                  className="text-[10px] sm:text-xs font-bold mb-2"
                  style={{ color: COLORS.PRIMARY }}
                >
                  Guest Information
                </h2>

                <p className="font-bold text-sm">{booking?.guestName || "Guest"}</p>

                <div className="mt-2 pt-2 text-[11px]" style={{ borderTop: `1px solid ${COLORS.DARK}` }}>
                  <p>Invoice: {booking?.invoiceNumber || "-"}</p>
                  <p>Date: {booking?.billingDate || "-"}</p>
                </div>
              </div>

              {/* BOOKING - WHITE CARD WITH SHADOW */}
              <div
                className="p-3 sm:p-4 rounded-lg text-xs sm:text-sm shadow-sm"
                style={{ backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.DARK}` }}
              >
                <h2
                  className="text-[10px] sm:text-xs font-bold mb-2"
                  style={{ color: COLORS.PRIMARY }}
                >
                  Booking Details
                </h2>

                <p className="font-bold">{booking?.roomType || "Room"}</p>
                <p className="text-[11px]" style={{ color: COLORS.TEXT_SECONDARY }}>Room #{booking?.roomNumber || "-"}</p>

                <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                  <div>
                    <p style={{ color: COLORS.MUTED }}>Check-in</p>
                    <p>{booking?.checkInDate || "-"}</p>
                  </div>
                  <div>
                    <p style={{ color: COLORS.MUTED }}>Check-out</p>
                    <p>{booking?.checkOutDate || "-"}</p>
                  </div>
                </div>

                <p className="mt-2 text-[11px]" style={{ color: COLORS.TEXT_SECONDARY }}>
                  {booking?.totalNights || "-"}
                </p>
              </div>
            </div>

            {/* BLACK LINED TABLE */}
            <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid #000000" }}>
              <table className="w-full text-xs sm:text-sm">
                <thead style={{ backgroundColor: "#FFFFFF" }}>
                  <tr style={{ borderBottom: "1px solid #000000" }}>
                    <th className="p-2 sm:p-3 text-left font-semibold">Description</th>
                    <th className="p-2 sm:p-3 text-right font-semibold">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  <tr style={{ borderBottom: "1px solid #000000" }}>
                    <td className="p-2 sm:p-3">Room Charges ({booking?.roomType || ""})</td>
                    <td className="p-2 sm:p-3 text-right">{booking?.roomCharges || "0"}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #000000" }}>
                    <td className="p-2 sm:p-3">Room Service</td>
                    <td className="p-2 sm:p-3 text-right">{booking?.roomService || "0"}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #000000" }}>
                    <td className="p-2 sm:p-3">Laundry Service</td>
                    <td className="p-2 sm:p-3 text-right">{booking?.laundry || "0"}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #000000" }}>
                    <td className="p-2 sm:p-3">Food & Beverages</td>
                    <td className="p-2 sm:p-3 text-right">{booking?.food || "0"}</td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:p-3">Airport Pickup</td>
                    <td className="p-2 sm:p-3 text-right">{booking?.airportPickup || "0"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SUMMARY WITH DISCOUNT */}
            <div className="w-full flex justify-end">
              <div className="w-full sm:w-64 text-xs sm:text-sm space-y-2">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{booking?.subtotal || "0"}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{booking?.tax || "0"}</span>
                </div>

                <div className="flex justify-between" style={{ color: COLORS.SUCCESS }}>
                  <span>Discount</span>
                  <span>-{booking?.discount || "0"}</span>
                </div>

                <div
                  className="pt-2 flex justify-between font-bold text-base"
                  style={{ borderTop: `1px solid ${COLORS.DARK}`, color: COLORS.PRIMARY }}
                >
                  <span>Total</span>
                  <span>{booking?.grandTotal || "0"}</span>
                </div>

              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end print:hidden">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto text-white px-4 py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                Print
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold bg-transparent transition-colors disabled:opacity-60"
                style={{ border: `1px solid ${COLORS.BORDER}`, color: COLORS.TEXT_PRIMARY }}
              >
                {downloading ? "Preparing..." : "Download"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
