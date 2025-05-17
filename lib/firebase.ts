import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDbOlLZG0GlkaOciRzceRSo-4NVLHQ4xTs",
  authDomain: "fantasy-warped.firebaseapp.com",
  projectId: "fantasy-warped",
  storageBucket: "fantasy-warped.firebasestorage.app",
  messagingSenderId: "466990222265",
  appId: "1:466990222265:web:af959081d9d870e3400468",
  measurementId: "G-GS8W8JBM94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics };
