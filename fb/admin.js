var admin = require("firebase-admin");

var serviceAccount = require("./fcm-test-27.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin