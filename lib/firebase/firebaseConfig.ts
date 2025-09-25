// Initialize Firebase for the frontend (Client-Side)
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "@firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5rWG0z1B9f-1YNB5XTYA26oRJ9JZQ-2Q",
  authDomain: "travelus-notification.firebaseapp.com",
  projectId: "travelus-notification",
  storageBucket: "travelus-notification.firebasestorage.app",
  messagingSenderId: "155159800970",
  appId: "1:155159800970:web:a8cfa9ff3f7a27e3659173",
};

// Initialize Firebase only when in the client-side
let messaging;
if (typeof window !== "undefined" && "navigator" in window) {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export { messaging, getToken, onMessage };
