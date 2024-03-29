require("firebase/auth");
const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
require("dotenv").config();

console.log(process.env.FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY.toString(),
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
});
