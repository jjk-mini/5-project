// Room status constants

export const ROOM_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  CLEANING: 'cleaning',
  MAINTENANCE: 'maintenance',
};
export const ROOM_STATUS_LABELS = {
  [ROOM_STATUS.AVAILABLE]:   'Available',
  [ROOM_STATUS.OCCUPIED]:    'Occupied',
  [ROOM_STATUS.CLEANING]:    'Cleaning',
  [ROOM_STATUS.MAINTENANCE]: 'Maintenance',
};

export const ROOM_TYPES = [
  'Standard',
  'Deluxe',
  'Suite',
  'Presidential',
];