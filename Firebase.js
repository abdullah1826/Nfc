// firebaseConfig.js
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "your-database-url",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
