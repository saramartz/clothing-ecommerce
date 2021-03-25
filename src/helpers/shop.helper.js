import { firestore, convertCollectionsSnapshotToMap } from '../firebase/firebase.utils.js'

export const fetchCollections = (updateCollections, setLoading) => {
    let unsubscribeFromSnapshot = null

    const collectionRef = firestore.collection('collections')

    unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

        updateCollections(collectionsMap)
        setLoading(false)
    })
}
