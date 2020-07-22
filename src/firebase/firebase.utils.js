import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCLt0-K2YKlaWpVeFahzq7QYMxptf_LYjQ',
  authDomain: 'crwn-db-e332f.firebaseapp.com',
  databaseURL: 'https://crwn-db-e332f.firebaseio.com',
  projectId: 'crwn-db-e332f',
  storageBucket: 'crwn-db-e332f.appspot.com',
  messagingSenderId: '202669837731',
  appId: '1:202669837731:web:1bac141d2f48dff994de16',
  measurementId: 'G-GJWCFK7D7K',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
