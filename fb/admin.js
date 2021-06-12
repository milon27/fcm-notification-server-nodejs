var admin = require("firebase-admin");

var serviceAccount = require("./your-serviceAccount-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin