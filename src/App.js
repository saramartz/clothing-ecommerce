import React, { useEffect, lazy, Suspense } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Switch, Route, Redirect } from 'react-router-dom'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

import { setLoggedUser } from './redux/user/user.actions'
import { selectLoggedUser } from './redux/user/user.selectors'

import './App.scss'
import Header from './components/layout/header/header.comp'
import Spinner from './components/spinner/spinner.comp'

const Homepage = lazy(() => import('./pages/homepage/homepage.comp'))
const ShopPage = lazy(() => import('./pages/shop/shop.comp.jsx'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.comp.jsx'))
const Auth = lazy(() => import('./pages/auth/auth.comp'))


// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'


const App = (props) => {
    let unsubscribeFromAuth = null

    const { setLoggedUser, loggeduser } = props

    useEffect(() => {
        unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)

                userRef.onSnapshot((snapShot) => {
                    setLoggedUser({
                        id: snapShot.id,
                        ...snapShot.data(),
                    })
                })
            } else {
                // If the user sign out, set state to null
                setLoggedUser(userAuth)

                // -----> Add Collection & Documents to firestore from json <-----

                // addCollectionAndDocuments(
                //     'collections',
                //     collectionsArray.map(({ items, title }) => ({ title, items }))
                // )
            }
        })

        return () => {
            unsubscribeFromAuth()
        }
    }, [])

    return (
        <>
            <Header />
            <Switch>
                <Suspense fallback={<Spinner />}>
                    <Route exact path='/' component={Homepage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route
                        exact
                        path='/signin'
                        render={() => (loggeduser ? <Redirect to='/' /> : <Auth />)}
                    />
                </Suspense>
            </Switch>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    loggeduser: selectLoggedUser,
    // collectionsArray: selectCollectionsForPreview,
})

const mapDispatchToProps = (dispatch) => ({
    setLoggedUser: (user) => dispatch(setLoggedUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
