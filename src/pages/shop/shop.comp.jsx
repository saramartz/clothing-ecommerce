import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchCollections } from '../../helpers/shop.helper'
import { updateCollections } from '../../redux/shop/shop.actions'

import WithSpinner from '../../components/spinner/with-spinner.comp'
import Spinner from '../../components/spinner/spinner.comp'

const CollectionsOverview = lazy(() =>
    import('../../components/collections-overview/collections-overview.comp')
)
const CollectionPage = lazy(() => import('../collection/collection.comp'))

const CollectionsOverviewSpinner = WithSpinner(CollectionsOverview)
const CollectionPageSpinner = WithSpinner(CollectionPage)

const ShopPage = ({ match, updateCollections }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCollections(updateCollections, setLoading)
    }, [])

    return (
        <div className='shop-page'>
            <Suspense fallback={<Spinner />}>
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => (
                        <CollectionsOverviewSpinner isLoading={loading} {...props} />
                    )}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageSpinner isLoading={loading} {...props} />}
                />
            </Suspense>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
})

export default connect(null, mapDispatchToProps)(ShopPage)
