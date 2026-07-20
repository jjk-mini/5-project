// Shared billing/date helpers

// Number of nights between two dates (rounded, minimum 1)
const calcNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
};

module.exports = { calcNights };
