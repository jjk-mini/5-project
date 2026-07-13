import React, { useState } from "react";
import Invoice from "../pages/Invoice"; 
import { COLORS } from "../constants/theme";
import {
  FileText,
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  Download,
  Printer,
} from "lucide-react";


const InvoicePaymentInfo = ({ booking }) => {
  const [openInvoice, setOpenInvoice] = useState(false);
  const [autoDownloadInvoice, setAutoDownloadInvoice] = useState(false);
  
  return (
    <>
    <div className="w-full mt-6">
      <div
        className="w-full rounded-3xl p-6 md:p-8 border"
        style={{
          backgroundColor: COLORS.SURFACE,
          borderColor: COLORS.BORDER,
          boxShadow: COLORS.CARD,
        }}
      >
        {/* Heading */}
        <div className="flex items-center gap-3 mb-8">
          <FileText size={24} style={{ color: COLORS.PRIMARY }} />
          <h2
            className="text-xl font-bold"
            style={{ color: COLORS.PRIMARY }}
          >
            Invoice & Payment Information
          </h2>
        </div>

        {/* Information */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 pb-8 border-b"
          style={{ borderColor: COLORS.BORDER }}
        >
          {/* Invoice Number */}
          <div>
            <div
              className="flex items-center gap-2 text-sm mb-2"
              style={{ color: COLORS.TEXT_SECONDARY }}
            >
              <FileText size={16} style={{ color: COLORS.PRIMARY }} />
              <span>Invoice Number</span>
            </div>

            <p
              className="font-semibold text-base"
              style={{ color: COLORS.TEXT_PRIMARY }}
            >
              {booking.invoiceNumber}
            </p>
          </div>

          {/* Billing Date */}
          <div>
            <div
              className="flex items-center gap-2 text-sm mb-2"
              style={{ color: COLORS.TEXT_SECONDARY }}
            >
              <CalendarDays size={16} style={{ color: COLORS.PRIMARY }} />
              <span>Billing Date</span>
            </div>

            <p
              className="font-semibold text-base"
              style={{ color: COLORS.TEXT_PRIMARY }}
            >
              {booking.billingDate}
            </p>
          </div>

          {/* Payment Status */}
          <div>
            <div
              className="flex items-center gap-2 text-sm mb-2"
              style={{ color: COLORS.TEXT_SECONDARY }}
            >
              <CircleDollarSign size={16} style={{ color: COLORS.PRIMARY }} />
              <span>Payment Status</span>
            </div>

            <span
              className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{
                backgroundColor: "#EAF7F0",
                color: COLORS.SUCCESS,
              }}
            >
              {booking.paymentStatus}
            </span>
          </div>

          {/* Payment Method */}
          <div>
            <div
              className="flex items-center gap-2 text-sm mb-2"
              style={{ color: COLORS.TEXT_SECONDARY }}
            >
              <CreditCard size={16} style={{ color: COLORS.PRIMARY }} />
              <span>Payment Method</span>
            </div>

            <p
              className="font-semibold text-base"
              style={{ color: COLORS.TEXT_PRIMARY }}
            >
              {booking.paymentMethod}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <button
            onClick={() => {
  alert("Button clicked!");
  setAutoDownloadInvoice(true);
}}
            className="flex items-center justify-center gap-2 rounded-xl border py-4 font-semibold transition-all duration-300"
            style={{
              borderColor: COLORS.PRIMARY,
              color: COLORS.PRIMARY,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.PRIMARY;
              e.currentTarget.style.color = COLORS.SURFACE;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = COLORS.PRIMARY;
            }}
          >
            <Download size={20} />
            Download Invoice
          </button>

         <button
  onClick={() => setOpenInvoice(true)}
  className="flex items-center justify-center gap-2 rounded-xl border py-4 font-semibold transition-all duration-300"
  style={{
    borderColor: COLORS.BORDER,
    color: COLORS.TEXT_PRIMARY,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = COLORS.PRIMARY;
    e.currentTarget.style.color = COLORS.PRIMARY;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = COLORS.BORDER;
    e.currentTarget.style.color = COLORS.TEXT_PRIMARY;
  }}
>
  <Printer size={20} />
  Print Invoice
</button>
        </div>
      </div>
    </div>
        {openInvoice && (
      <Invoice
        booking={booking}
        onClose={() => setOpenInvoice(false)}
      />
    )}
    {autoDownloadInvoice && (
      <Invoice
        booking={booking}
        autoDownload
        onClose={() => setAutoDownloadInvoice(false)}
      />
    )}
    </>
  );
};

export default InvoicePaymentInfo;