import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBwh7k4V7PvvXph4PNu6Zk8QrewJLXszuY",
    authDomain: "signal-bb944.firebaseapp.com",
    projectId: "signal-bb944",
    storageBucket: "signal-bb944.appspot.com",
    messagingSenderId: "514132752011",
    appId: "1:514132752011:web:6555f85c1f71f67c92c68e"
  };

let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export {db,auth};