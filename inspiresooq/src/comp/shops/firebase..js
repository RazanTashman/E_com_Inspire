import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyAS33NWARj3ZVRF5devumFItq9sw8ZiC9g",
    authDomain: "inspire-sooq.firebaseapp.com",
    projectId: "inspire-sooq",
    storageBucket: "inspire-sooq.appspot.com",
    messagingSenderId: "436311085320",
    appId: "1:436311085320:web:115b7248e62d7521639cbd",
    measurementId: "G-HYYN9DWV40"
  };

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default};


