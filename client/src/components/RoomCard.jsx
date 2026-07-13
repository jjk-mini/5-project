import { useState } from 'react';
import './RoomCard.css';
import StatusBadge from './StatusBadge';
import RoomIllustration from './RoomIllustration';

// room = { _id, roomNumber, type, price, status, image }
// onClick(room) opens the view/edit modal in the parent component.
//
// Image handling: tries to render a real image (upload or URL) first.
// If it fails to load (network issue), onError falls back to
// RoomIllustration so a broken image never appears.
const RoomCard = ({ room, onClick }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showRealImage = room.image && !imageFailed;

  return (
    <div className="room-card" onClick={() => onClick(room)}>
      <div className="room-card__image-wrap">
        {showRealImage ? (
          <img
            src={room.image}
            alt={`Room ${room.roomNumber}`}
            className="room-card__image"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <RoomIllustration type={room.type} seed={room.roomNumber || room._id} />
        )}
        <div className="room-card__status-overlay">
          <StatusBadge status={room.status} />
        </div>
      </div>

      <div className="room-card__body">
        <div className="room-card__top-row">
          <h3 className="room-card__number">Room {room.roomNumber}</h3>
          <span className="room-card__price">
            Rs {Number(room.price).toLocaleString()}
            <span className="room-card__price-unit">/night</span>
          </span>
        </div>
        <p className="room-card__type">{room.type}</p>
      </div>

      <div className="room-card__accent-line" />
    </div>
  );
};

export default RoomCard;
