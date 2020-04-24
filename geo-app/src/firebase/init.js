import firebase from 'firebase';
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC5CoTW03oPU3LcRFxXKec9U-NIXsa7hso",
    authDomain: "geo-app-9e46f.firebaseapp.com",
    databaseURL: "https://geo-app-9e46f.firebaseio.com",
    projectId: "geo-app-9e46f",
    storageBucket: "geo-app-9e46f.appspot.com",
    messagingSenderId: "228612239159",
    appId: "1:228612239159:web:619376bdb9dba393f074b2",
    measurementId: "G-JMSVL08WP9"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();