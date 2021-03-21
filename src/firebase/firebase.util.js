import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBvxb-opZz9Jxf1fx8Y5X07MxPD9omQW5M",
    authDomain: "fir-app-24c58.firebaseapp.com",
    projectId: "fir-app-24c58",
    storageBucket: "fir-app-24c58.appspot.com",
    messagingSenderId: "751533703797",
    appId: "1:751533703797:web:04e9aa60ad62fe6cd2ae3c"
};
// Initialize Firebase
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
           await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData
           }); 
        }catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

 //22:35
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle =  () => auth.signInWithPopup(provider);

export default firebase;