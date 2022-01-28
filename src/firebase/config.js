import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDw4Q2PZteIeZINL_naUZRm-SZljnzHg6A",
    authDomain: "hire-devs-app.firebaseapp.com",
    projectId: "hire-devs-app",
    storageBucket: "hire-devs-app.appspot.com",
    messagingSenderId: "872046629654",
    appId: "1:872046629654:web:9ef74bba1b9fff4d4b3637"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, timestamp }