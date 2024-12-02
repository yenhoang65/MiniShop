// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAUiB4B17bfHPGez1TK0IKz85ZxT02i10Y", // Thay bằng API Key từ Firebase Console
    authDomain: "simpleap-4f1f3.firebaseapp.com",
    databaseURL: "https://simpleap-4f1f3-default-rtdb.firebaseio.com",
    projectId: "simpleap-4f1f3",
    storageBucket: "simpleap-4f1f3.appspot.com",
    messagingSenderId: "1029268110004",
    appId: "1:1029268110004:web:b5d48db51d370deb3135e1",
    measurementId: "G-F8Z19NRB1J", // Có thể bỏ qua nếu không dùng Google Analytics
};

const app = initializeApp(firebaseConfig);

// Khởi tạo Authentication, Firestore, và Storage
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
