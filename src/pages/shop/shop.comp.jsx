import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils.js'

import { updateCollections } from '../../redux/shop/shop.actions'

import CollectionsOverview from '../../components/collections-overview/collections-overview.comp'
import CollectionPage from '../collection/collection.comp'

import Spinner from '../../components/spinner/spinner.comp'

const CollectionsOverviewSpinner = Spinner(CollectionsOverview)
const CollectionPageSpinner = Spinner(CollectionPage)

const ShopPage = ({ match, updateCollections }) => {
    const [loading, setLoading] = useState(true)

    let unsubscribeFromSnapshot = null

    useEffect(() => {
        const collectionRef = firestore.collection('collections')

        unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

            updateCollections(collectionsMap)
            setLoading(false)
        })

        return () => {}
    }, [])

    return (
        <div className='shop-page'>
            <Route
                exact
                path={`${match.path}`}
                render={(props) => <CollectionsOverviewSpinner isLoading={loading} {...props} />}
            />
            <Route
                path={`${match.path}/:collectionId`}
                render={(props) => <CollectionPageSpinner isLoading={loading} {...props} />}
            />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
})

export default connect(null, mapDispatchToProps)(ShopPage)
