import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import BillingBanner from "../components/BillingBanner";
import BookingDetails from "../components/BookingDetail";
import BillingDetails from "../components/BillingDetails";
import InvoicePaymentInfo from "../components/InvoicePaymentInfo";
import PaymentForm from "../components/PaymentForm";
import SpecialRequests from "../components/SpeacialRequest";
import billingApi from "../api/billingApi";
import {mapBillingToView}  from "../utils/billingViewModel"
import { COLORS, FONTS } from "../constants/theme";

const BillingPage = () => {
  const { bookingId } = useParams();
  const [viewModel, setViewModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBilling = useCallback(async () => {
    if (!bookingId) {
      setError("No booking ID provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await billingApi.getByBookingId(bookingId);
      const billing = res.data?.billing;
      if (!billing) {
        setError("Billing information could not be loaded.");
        setViewModel(null);
        return;
      }
      setViewModel(mapBillingToView(billing));
    } catch (err) {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 404
          ? "Booking not found."
          : "Failed to load billing details.");
      setError(message);
      setViewModel(null);
      if (err.response?.status !== 401) {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    loadBilling();
  }, [loadBilling]);

  const isPaid = viewModel?.paymentStatusRaw === "paid";

  if (loading) {
    return (
      <div
        className="min-h-[50vh] flex items-center justify-center"
        style={{ fontFamily: FONTS.BODY, color: COLORS.TEXT_SECONDARY }}
      >
        Loading billing details...
      </div>
    );
  }

  if (error || !viewModel) {
    return (
      <div
        className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-4 text-center"
        style={{ fontFamily: FONTS.BODY, color: COLORS.TEXT_PRIMARY }}
      >
        <p>{error || "Unable to load billing."}</p>
        <button
          type="button"
          onClick={loadBilling}
          className="px-5 py-2 rounded-lg text-white font-semibold"
          style={{ backgroundColor: COLORS.PRIMARY }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 lg:px-6 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_620px] gap-6 items-start">
        <div className="w-full space-y-6">
          <BillingBanner booking={viewModel} />
          <BookingDetails booking={viewModel} />
          <BillingDetails booking={viewModel} />
          <InvoicePaymentInfo booking={viewModel} isPaid={isPaid} />
        </div>

        <div className="w-full xl:w-[620px] self-start flex flex-col gap-6 mt-5">
          {isPaid && (
            <div
              className="rounded-2xl border p-4 text-sm font-medium text-center"
              style={{
                backgroundColor: "#EAF7F0",
                borderColor: `${COLORS.SUCCESS}33`,
                color: COLORS.SUCCESS,
              }}
            >
              This booking has already been paid.
            </div>
          )}
          <PaymentForm
            billingId={viewModel.billingId}
            amountDue={viewModel.totalAmountRaw}
            isPaid={isPaid}
            onPaymentSuccess={loadBilling}
          />
          <SpecialRequests specialRequests={viewModel.specialRequests} />
        </div>
      </div>
    </div>
  );
};

export default BillingPage;