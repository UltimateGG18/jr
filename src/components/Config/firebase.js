import firebase from 'firebase/app'
import 'firebase/auth';

const config={
    apiKey: "AIzaSyBFjveaJ0demJ7BTwq6eOhPDwF3cxBN1f8",
    authDomain: "otp-login-491cd.firebaseapp.com",
    projectId: "otp-login-491cd",
    storageBucket: "otp-login-491cd.appspot.com",
    messagingSenderId: "878852561690",
    appId: "1:878852561690:web:2ad17c37718fcaed2b6aa3"
}

 firebase.initializeApp(config)
 export default firebase