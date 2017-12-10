import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCeRCtBAimBzIeKpOkAUvsAQSFp_JBhNSY",
    authDomain: "cryptoportfolio-c1f04.firebaseapp.com",
    databaseURL: "https://cryptoportfolio-c1f04.firebaseio.com",
    projectId: "cryptoportfolio-c1f04",
    storageBucket: "cryptoportfolio-c1f04.appspot.com",
    messagingSenderId: "856267415521"
  };
firebase.initializeApp(config);
export default firebase;
