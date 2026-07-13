import './RoomIllustration.css';

// Each room type has its own icon set and gradient. This is CSS/emoji based
// with no external image URLs, so it never fails to load regardless of
// network conditions.

const TYPE_ICONS = {
  Standard: ['🛏️', '🪟', '📺', '☕'],
  Deluxe: ['🛋️', '🕯️', '🖼️', '🌇'],
  Suite: ['🛁', '🥂', '🍾', '🌆'],
  Presidential: ['👑', '💎', '🍽️', '🎇'],
};

const TYPE_CLASS = {
  Standard: 'illustration--standard',
  Deluxe: 'illustration--deluxe',
  Suite: 'illustration--suite',
  Presidential: 'illustration--presidential',
};

// seed = room number/id, used to vary the icon per room
const RoomIllustration = ({ type, seed = 0 }) => {
  const icons = TYPE_ICONS[type] || TYPE_ICONS.Standard;
  const numericSeed =
    typeof seed === 'string'
      ? seed.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
      : Number(seed) || 0;
  const icon = icons[numericSeed % icons.length];
  const typeClass = TYPE_CLASS[type] || TYPE_CLASS.Standard;

  return (
    <div className={`room-illustration ${typeClass}`}>
      <span className="room-illustration__icon">{icon}</span>
      <span className="room-illustration__ring" />
    </div>
  );
};

export default RoomIllustration;
