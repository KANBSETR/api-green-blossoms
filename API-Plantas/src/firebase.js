require('dotenv').config();

console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = {
    db,
};