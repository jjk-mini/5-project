import { ROOM_STATUS } from '../constants/roomStatus';
const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1607712617949-8c993d290809?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1612320743558-020669ff20e8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1592229506151-845940174bb0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1630587148265-761cbd139043?auto=format&fit=crop&w=800&q=80',
];

// Seed data — 15 rooms, each with its own real photo
let ROOMS = [
  { _id: '1', roomNumber: '101', type: 'Standard', price: 8000, status: ROOM_STATUS.AVAILABLE, image: SAMPLE_IMAGES[0] },
  { _id: '2', roomNumber: '102', type: 'Standard', price: 8000, status: ROOM_STATUS.OCCUPIED, image: SAMPLE_IMAGES[1] },
  { _id: '3', roomNumber: '103', type: 'Standard', price: 8500, status: ROOM_STATUS.CLEANING, image: SAMPLE_IMAGES[2] },
  { _id: '4', roomNumber: '104', type: 'Standard', price: 8500, status: ROOM_STATUS.AVAILABLE, image: SAMPLE_IMAGES[3] },
  { _id: '5', roomNumber: '201', type: 'Deluxe', price: 14000, status: ROOM_STATUS.CLEANING, image: SAMPLE_IMAGES[4] },
  { _id: '6', roomNumber: '202', type: 'Deluxe', price: 14000, status: ROOM_STATUS.AVAILABLE, image: SAMPLE_IMAGES[5] },
  { _id: '7', roomNumber: '203', type: 'Deluxe', price: 14500, status: ROOM_STATUS.OCCUPIED, image: SAMPLE_IMAGES[6] },
  { _id: '8', roomNumber: '204', type: 'Deluxe', price: 14500, status: ROOM_STATUS.MAINTENANCE, image: SAMPLE_IMAGES[7] },
  { _id: '9', roomNumber: '301', type: 'Suite', price: 22000, status: ROOM_STATUS.OCCUPIED, image: SAMPLE_IMAGES[8] },
  { _id: '10', roomNumber: '302', type: 'Suite', price: 22000, status: ROOM_STATUS.MAINTENANCE, image: SAMPLE_IMAGES[9] },
  { _id: '11', roomNumber: '303', type: 'Suite', price: 23000, status: ROOM_STATUS.AVAILABLE, image: SAMPLE_IMAGES[10] },
  { _id: '12', roomNumber: '304', type: 'Suite', price: 23000, status: ROOM_STATUS.CLEANING, image: SAMPLE_IMAGES[11] },
  { _id: '13', roomNumber: '401', type: 'Presidential', price: 45000, status: ROOM_STATUS.AVAILABLE, image: SAMPLE_IMAGES[12] },
  { _id: '14', roomNumber: '402', type: 'Presidential', price: 48000, status: ROOM_STATUS.OCCUPIED, image: SAMPLE_IMAGES[13] },
  { _id: '15', roomNumber: '403', type: 'Presidential', price: 50000, status: ROOM_STATUS.AVAILABLE, image: SAMPLE_IMAGES[14] },
];

let nextId = 16;

// Small delay to emulate a real network call
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllRooms = async (filters = {}) => {
  await delay();
  let result = [...ROOMS];

  if (filters.status && filters.status !== 'all') {
    result = result.filter((r) => r.status === filters.status);
  }
  if (filters.type && filters.type !== 'all') {
    result = result.filter((r) => r.type === filters.type);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter((r) => r.roomNumber.toLowerCase().includes(q));
  }

  return result;
};

export const getRoomById = async (id) => {
  await delay();
  const room = ROOMS.find((r) => r._id === id);
  if (!room) throw new Error('Room not found');
  return room;
};

// If roomData.image is a File, generate an object URL so the uploaded
// photo previews immediately (this stands in for a real Cloudinary URL).
export const createRoom = async (roomData) => {
  await delay();
  const image =
    roomData.image instanceof File
      ? URL.createObjectURL(roomData.image)
      : roomData.image || null;

  const newRoom = {
    _id: String(nextId++),
    roomNumber: roomData.roomNumber,
    type: roomData.type,
    price: Number(roomData.price),
    status: roomData.status,
    image,
  };

  ROOMS = [newRoom, ...ROOMS];
  return newRoom;
};

export const updateRoom = async (id, roomData) => {
  await delay();
  const index = ROOMS.findIndex((r) => r._id === id);
  if (index === -1) throw new Error('Room not found');

  const image =
    roomData.image instanceof File
      ? URL.createObjectURL(roomData.image)
      : ROOMS[index].image;

  const updated = {
    ...ROOMS[index],
    roomNumber: roomData.roomNumber,
    type: roomData.type,
    price: Number(roomData.price),
    status: roomData.status,
    image,
  };

  ROOMS[index] = updated;
  return updated;
};

export const deleteRoom = async (id) => {
  await delay();
  ROOMS = ROOMS.filter((r) => r._id !== id);
  return { success: true };
};
