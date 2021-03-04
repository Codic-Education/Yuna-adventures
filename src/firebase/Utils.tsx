import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from './config';

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const firestore= firebase.firestore()
export const storage = firebase.storage();

export default firebase;



export const sendTest = async()=>{
    await firestore.collection("TestCollection").doc("testDoc").set({members: "XXALI, XXMohammad,XXkhazar", date: 2020 })
}

