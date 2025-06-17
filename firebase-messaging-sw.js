// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyD1WtzGBJFnt_I5EoHWIx992J4xHI8Iw5s",
    authDomain: "gruleiru-5e417.firebaseapp.com",
    projectId: "gruleiru-5e417",
    storageBucket: "gruleiru-5e417.appspot.com",
    messagingSenderId: "943733082073",
    appId: "1:943733082073:web:47a68cfed2f21b9bdebbc8",
    measurementId: "G-9GD58FY0PG"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    //console.log(
    //    '[firebase-messaging-sw.js] Received background message ',
    //    payload
    //);
    // Customize notification here
    //const notificationTitle = 'Background Message Title';
    //const notificationOptions = {
    //    body: 'Background Message body.',
    //    icon: '/firebase-logo.png'
    //};

    // self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Close the notification

    const link = event.notification.data.link;

    if (link) {
        // Open the link in a new tab/window
        event.waitUntil(clients.openWindow(link));
    }
});