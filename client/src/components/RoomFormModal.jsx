import { useState, useEffect } from 'react';
import "./RoomFormModal.css";
import { ROOM_STATUS,
   ROOM_STATUS_LABELS, 
   ROOM_TYPES } from '../constants/roomStatus';



const emptyForm = {
  roomNumber: '',
  type: ROOM_TYPES[0],
  price: '',
  status: ROOM_STATUS.AVAILABLE,
  image: null,
};

// mode = 'add' | 'edit'
// room = existing room object (edit mode only)
// onSave(formValues) is called by the parent to create/update
// onDelete(id) is called by the parent to delete (edit mode only)
const RoomFormModal = ({ mode, room, onClose, onSave, onDelete, saving }) => {
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (mode === 'edit' && room) {
      setForm({
        roomNumber: room.roomNumber || '',
        type: room.type || ROOM_TYPES[0],
        price: room.price || '',
        status: room.status || ROOM_STATUS.AVAILABLE,
        image: null,
      });
      setPreview(room.image || null);
    } else {
      setForm(emptyForm);
      setPreview(null);
    }
  }, [mode, room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.roomNumber || !form.price) return;
    onSave(form);
  };

  return (
    <div className="rf-overlay" onClick={onClose}>
      <div className="rf-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rf-modal__header">
          <h2>{mode === 'edit' ? `Edit Room ${room?.roomNumber}` : 'Add New Room'}</h2>
          <button className="rf-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="rf-form">
          <div className="rf-image-upload">
            <label htmlFor="room-image" className="rf-image-upload__preview">
              {preview ? (
                <img src={preview} alt="Room preview" />
              ) : (
                <span className="rf-image-upload__placeholder">+ Upload room photo</span>
              )}
            </label>
            <input
              id="room-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            <p className="rf-image-upload__hint">Your photo will appear here instantly</p>
          </div>

          <div className="rf-field-row">
            <div className="rf-field">
              <label>Room Number</label>
              <input
                name="roomNumber"
                value={form.roomNumber}
                onChange={handleChange}
                placeholder="e.g. 204"
                required
              />
            </div>
            <div className="rf-field">
              <label>Price / Night</label>
              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 12000"
                required
              />
            </div>
          </div>

          <div className="rf-field-row">
            <div className="rf-field">
              <label>Room Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                {ROOM_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="rf-field">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                {Object.values(ROOM_STATUS).map((s) => (
                  <option key={s} value={s}>{ROOM_STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rf-actions">
            {mode === 'edit' && (
              <button
                type="button"
                className="rf-btn rf-btn--danger"
                onClick={() => onDelete(room._id)}
                disabled={saving}
              >
                Delete Room
              </button>
            )}
            <div className="rf-actions__right">
              <button type="button" className="rf-btn rf-btn--ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="rf-btn rf-btn--primary" disabled={saving}>
                {saving ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Add Room'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomFormModal;
