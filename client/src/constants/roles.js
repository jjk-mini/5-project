// User role constants — use these everywhere instead of hardcoding strings

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  RECEPTIONIST: 'receptionist',
  HOUSEKEEPING: 'housekeeping',
  GUEST: 'guest',
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Admin",
  [ROLES.MANAGER]: "Manager",
  [ROLES.RECEPTIONIST]: "Receptionist",
  [ROLES.HOUSEKEEPING]: "Housekeeping",
  [ROLES.GUEST]: "Guest",
};

export const ROOM_MANAGEMENT_ALLOWED_ROLES = [
  ROLES.ADMIN,
  ROLES.MANAGER,
  ROLES.RECEPTIONIST,
];