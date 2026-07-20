// Role-based access control middleware.
//
// NOTE: the actual implementation lives in authMiddleware.js as
// `authorizeRoles`, since that's what every route file in this project
// already imports (protect + authorizeRoles together). This file just
// re-exports it under the same name so both import paths work.
const { authorizeRoles } = require("./authMiddleware");

module.exports = { authorize: authorizeRoles, authorizeRoles };
