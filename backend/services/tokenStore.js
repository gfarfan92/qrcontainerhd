const tokenStore = {};

function saveToken(email, token) {
    tokenStore[email] = {
        token,
        expiresAt: Date.now() + 10 * 60 * 1000
    };
}

function validateToken(email, inputToken) {
    const data = tokenStore[email];
    if (!data) return false;

    const isValid = data.token == inputToken && Date.now() < data.expiresAt;

    if (isValid) {
        delete tokenStore[email];
    }
    return isValid;
}

function getTokenData(email) {
    const data = tokenStore[email];
    if (!data) return null;
    if (Date.now() > data.expiresAt) {
        delete tokenStore[email];
        return null;
    }
    return data.token;
}

function deleteToken(email) {
    delete tokenStore[email];
}

module.exports = {
    saveToken,
    validateToken,
    getTokenData,
    deleteToken
};
