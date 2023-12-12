// firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCoxv_JEN77_mrKL9m0WIqS1AniucjMcns",
    authDomain: "app-baruch.firebaseapp.com",
    projectId: "app-baruch",
    storageBucket: "app-baruch.appspot.com",
    messagingSenderId: "630346551276",
    appId: "1:630346551276:web:124c15fdc76390520efac9"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
