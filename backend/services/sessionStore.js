const activeSessions = {}; // email → sessionID

function isSessionActive(email) {
  return activeSessions[email] !== undefined;
}

function createSession(email, sessionID) {
  activeSessions[email] = sessionID;
}

function destroySession(email) {
  delete activeSessions[email];
}

module.exports = {
  isSessionActive,
  createSession,
  destroySession
};
