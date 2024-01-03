import { Analytics, getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDMapLLAzc8YYTYpv6WM26d6NwasdczpgQ",
  authDomain: "tsa2024-software-development.firebaseapp.com",
  projectId: "tsa2024-software-development",
  storageBucket: "tsa2024-software-development.appspot.com",
  messagingSenderId: "553795186855",
  appId: "1:553795186855:web:29b63a4526dac787ceab82",
  measurementId: "G-417KMGRLKK",
};

const app = initializeApp(firebaseConfig);
let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const functions = getFunctions(app);

export { analytics, app, functions };
