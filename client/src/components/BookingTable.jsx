import { formatCurrency, formatDate } from '../utils/billing';

export default function BookingTable({ bookings, selectedId, onSelect }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-14 text-center">
        <p className="font-body text-sm text-ink/50">No bookings match your search.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[860px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-background/70">
            <th className="w-10 py-3 pl-4 pr-2"></th>
            <th className="whitespace-nowrap px-3 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/50">
              Booking ID
            </th>
            <th className="whitespace-nowrap px-3 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/50">
              Guest Name
            </th>
            <th className="whitespace-nowrap px-3 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/50">
              Room No.
            </th>
            <th className="whitespace-nowrap px-3 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/50">
              Check-In
            </th>
            <th className="whitespace-nowrap px-3 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/50">
              Check-Out
            </th>
            <th className="whitespace-nowrap px-3 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/50">
              Room Type
            </th>
            <th className="whitespace-nowrap px-3 py-3 pr-4 text-right font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/50">
              Rate / Night
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const isSelected = booking.id === selectedId;
            return (
              <tr
                key={booking.id}
                onClick={() => onSelect(booking.id)}
                className={`cursor-pointer border-b border-border/70 last:border-b-0 transition-colors ${
                  isSelected ? 'bg-primary/[0.06]' : 'hover:bg-background/70'
                }`}
              >
                <td className="py-3 pl-4 pr-2">
                  <span
                    className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${
                      isSelected ? 'border-primary' : 'border-ink/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="selected-booking"
                      checked={isSelected}
                      onChange={() => onSelect(booking.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      aria-label={`Select booking ${booking.id}`}
                    />
                    {isSelected && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 font-mono text-[13px] font-medium text-primary">
                  {booking.displayId || booking.id}
                </td>
                <td className="whitespace-nowrap px-3 py-3 font-body text-sm font-medium text-ink">
                  {booking.guestName}
                </td>
                <td className="whitespace-nowrap px-3 py-3 font-body text-sm text-ink/70">{booking.roomNumber}</td>
                <td className="whitespace-nowrap px-3 py-3 font-body text-sm text-ink/70">
                  {formatDate(booking.checkIn)}
                </td>
                <td className="whitespace-nowrap px-3 py-3 font-body text-sm text-ink/70">
                  {formatDate(booking.checkOut)}
                </td>
                <td className="whitespace-nowrap px-3 py-3 font-body text-sm text-ink/70">{booking.roomType}</td>
                <td className="whitespace-nowrap px-3 py-3 pr-4 text-right font-mono text-sm font-medium text-ink">
                  {formatCurrency(booking.ratePerNight)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}