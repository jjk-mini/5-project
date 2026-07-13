import { useEffect, useState, useMemo } from 'react';
import "./RoomManagment.css"

// import { useRole } from '../utils/RoleRoute';
import { getAllRooms, createRoom, updateRoom, deleteRoom } from '../api/roomApi';
import { ROOM_STATUS, ROOM_STATUS_LABELS, ROOM_TYPES } from '../constants/roomStatus';
import { ROLES, ROLE_LABELS, ROOM_MANAGEMENT_ALLOWED_ROLES } from '../constants/roles';
import RoomCard from "../components/RoomCard";
import RoomFormModal from "../components/RoomFormModal";

const RoomManagement = () => {
 const [role, setRole] = useState(ROLES.ADMIN);
  const isAllowed = ROOM_MANAGEMENT_ALLOWED_ROLES.includes(role);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [activeRoom, setActiveRoom] = useState(null);

  // Apply the theme once when this page mounts. Ideally this call lives in
  // main.jsx so it applies app-wide; it's also included here for standalone
  // testing of this module.

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllRooms({ status: statusFilter, type: typeFilter, search });
      setRooms(Array.isArray(data) ? data : data.rooms || []);
    } catch (err) {
      setError('Could not load rooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, typeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRooms();
  };

  const stats = useMemo(() => {
    const counts = {
      total: rooms.length,
      [ROOM_STATUS.AVAILABLE]: 0,
      [ROOM_STATUS.OCCUPIED]: 0,
      [ROOM_STATUS.CLEANING]: 0,
      [ROOM_STATUS.MAINTENANCE]: 0,
    };
    let revenue = 0;
    rooms.forEach((r) => {
      if (counts[r.status] !== undefined) counts[r.status] += 1;
      if (r.status === ROOM_STATUS.OCCUPIED) revenue += Number(r.price) || 0;
    });
    return { ...counts, revenue };
  }, [rooms]);

  const openAddModal = () => {
    setModalMode('add');
    setActiveRoom(null);
    setModalOpen(true);
  };

  const openEditModal = (room) => {
    setModalMode('edit');
    setActiveRoom(room);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = async (formValues) => {
    setSaving(true);
    try {
      if (modalMode === 'edit' && activeRoom) {
        await updateRoom(activeRoom._id, formValues);
      } else {
        await createRoom(formValues);
      }
      await fetchRooms();
      setModalOpen(false);
    } catch (err) {
      setError('Could not save the room. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try {
      await deleteRoom(id);
      await fetchRooms();
      setModalOpen(false);
    } catch (err) {
      setError('Could not delete the room. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rm-page">
      {/* Temporary role switcher for demoing role-based access before the
          real Auth/login module is wired up. Remove once AuthContext
          provides the actual logged-in user's role. */}
      <div className="rm-role-demo">
        <span>Demo — Viewing as:</span>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {Object.values(ROLES).map((r) => (
            <option key={r} value={r}>{ROLE_LABELS[r]}</option>
          ))}
        </select>
      </div>

      {!isAllowed ? (
        <div className="rm-access-denied">
          <span className="rm-access-denied__icon">🔒</span>
          <h2>Access Restricted</h2>
          <p>
            Room Management is only available to Admin, Manager, and Receptionist
            accounts. Guests don't have permission to view this page.
          </p>
        </div>
      ) : (
      <>
      <header className="rm-hero">
        <p className="rm-hero__eyebrow">LuxuryStay Hospitality</p>
        <h1 className="rm-hero__title">Luxury Hotel Room Management</h1>
        <p className="rm-hero__subtitle">
          Manage every room with elegance and efficiency — live status, type, and pricing in one place.
        </p>
      </header>

      <div className="rm-dashboard-row">
        <h2 className="rm-dashboard-title">Room Dashboard</h2>
        <button className="rm-add-btn" onClick={openAddModal}>
          <span className="rm-add-btn__icon">+</span> Add Room
        </button>
      </div>

      <div className="rm-stats">
        <div className="rm-stat rm-stat--total">
          <span className="rm-stat__icon rm-stat__icon--total">🏨</span>
          <span className="rm-stat__value">{stats.total}</span>
          <span className="rm-stat__label">Total Rooms</span>
        </div>
        <div className="rm-stat rm-stat--available">
          <span className="rm-stat__icon rm-stat__icon--available">🚪</span>
          <span className="rm-stat__value">{stats[ROOM_STATUS.AVAILABLE]}</span>
          <span className="rm-stat__label">Available</span>
        </div>
        <div className="rm-stat rm-stat--occupied">
          <span className="rm-stat__icon rm-stat__icon--occupied">🛏️</span>
          <span className="rm-stat__value">{stats[ROOM_STATUS.OCCUPIED]}</span>
          <span className="rm-stat__label">Occupied</span>
        </div>
        <div className="rm-stat rm-stat--cleaning">
          <span className="rm-stat__icon rm-stat__icon--cleaning">🧹</span>
          <span className="rm-stat__value">{stats[ROOM_STATUS.CLEANING]}</span>
          <span className="rm-stat__label">Cleaning</span>
        </div>
        <div className="rm-stat rm-stat--maintenance">
          <span className="rm-stat__icon rm-stat__icon--maintenance">🛠️</span>
          <span className="rm-stat__value">{stats[ROOM_STATUS.MAINTENANCE]}</span>
          <span className="rm-stat__label">Maintenance</span>
        </div>
        <div className="rm-stat rm-stat--revenue">
          <span className="rm-stat__icon rm-stat__icon--revenue">Rs</span>
          <span className="rm-stat__value">Rs {stats.revenue.toLocaleString()}</span>
          <span className="rm-stat__label">Total Revenue</span>
        </div>
      </div>

      <form className="rm-filter-bar" onSubmit={handleSearchSubmit}>
        <input
          className="rm-search"
          type="text"
          placeholder="Search by room number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          {ROOM_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          {Object.values(ROOM_STATUS).map((s) => (
            <option key={s} value={s}>{ROOM_STATUS_LABELS[s]}</option>
          ))}
        </select>

        <button type="submit" className="rm-search-btn">Search</button>
      </form>

      {error && <div className="rm-error">{error}</div>}

      {loading ? (
        <div className="rm-loading">Loading rooms...</div>
      ) : rooms.length === 0 ? (
        <div className="rm-empty">
          <p>No rooms found. Add a new room or clear your filters.</p>
        </div>
      ) : (
        <div className="rm-grid">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} onClick={openEditModal} />
          ))}
        </div>
      )}

      {modalOpen && (
        <RoomFormModal
          mode={modalMode}
          room={activeRoom}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
          saving={saving}
        />
      )}
      </>
      )}
    </div>
  );
};

export default RoomManagement;
