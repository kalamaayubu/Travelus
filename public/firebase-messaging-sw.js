// Purpose: Handle incoming push notifications with firebase

importScripts(
  "https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js"
);

// Initialize firebase
firebase.initializeApp({
  apiKey: "AIzaSyD5rWG0z1B9f-1YNB5XTYA26oRJ9JZQ-2Q",
  authDomain: "travelus-notification.firebaseapp.com",
  projectId: "travelus-notification",
  storageBucket: "travelus-notification.firebasestorage.app",
  appId: "1:155159800970:web:a8cfa9ff3f7a27e3659173",
  messagingSenderId: "155159800970",
});

// Initialize FCM to enable this(sw) to receive push notifications from firebase servers
const messaging = firebase.messaging();

// Listen to background messages from firebase servers
messaging.onBackgroundMessage((payload) => {
  // Extract the required details from the payload
  const notificationTitle = payload.data?.title;
  const notificationOptions = {
    body:
      payload.data?.body ||
      "You have a new message from Travelus, please check it out.",
    icon: "/assets/icons/PWAlogoo.svg " || payload.data?.icon,
    data: { url: payload.data?.url || "/available-rides" }, // Redirect to the homepage when clicked
  };

  // Display push notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click events
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/available-rides";

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      }) /* Get all browser tabs controlled by this service worker */
      .then((clientList) => {
        // Loop through each open tab/window
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && "focus" in client) {
            return client.focus(); // If a matching tab exists, bring it to the front
          }
        }
        // If no matching tab is found, open a new one
        return clients.openWindow(targetUrl);
      })
  );
});
