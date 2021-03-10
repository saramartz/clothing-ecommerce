import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: 'AIzaSyDc-fzQK_RStYqtsNU2NngQN8GKNCYvloE',
    authDomain: 'fashion-db-71219.firebaseapp.com',
    projectId: 'fashion-db-71219',
    storageBucket: 'fashion-db-71219.appspot.com',
    messagingSenderId: '646214352414',
    appId: '1:646214352414:web:f240291f9a6d8a4bde380f',
}

firebase.initializeApp(config)

// Store new user in Firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    // If user isn't registered add it to db
    if (!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

// Enable Firestore & Firebase Methods
export const auth = firebase.auth()
export const firestore = firebase.firestore()

// Google signin
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

// Add Collection & Documents to firestore from json
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch()

    objectsToAdd.forEach((obj) => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })

    return await batch.commit()
}

// Get Collection items from Firebase and CONVERT from array to object (map)
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}

export default firebase
