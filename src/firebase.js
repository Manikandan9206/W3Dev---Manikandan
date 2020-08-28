import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// import store from './store'

var firebaseConfig = {
  apiKey: 'AIzaSyBECivZ-5cRmLTuUr3yk7txhnQVs7v1Yqg',
  authDomain: 'w3dev-intern.firebaseapp.com',
  databaseURL: 'https://w3dev-intern.firebaseio.com',
  projectId: 'w3dev-intern',
  storageBucket: 'w3dev-intern.appspot.com',
  messagingSenderId: '663037192884',
  appId: '1:663037192884:web:643df1b7422ecc9148c5e1'
}
firebase.initializeApp(firebaseConfig)

/* firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('autoSignIn', user.email)
    store.dispatch('checkAdmin', user.uid)
  }
}) */

export const db = firebase.firestore()
export const auth = firebase.auth()
