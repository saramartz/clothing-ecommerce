import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Switch, Route, Redirect } from 'react-router-dom'

import Homepage from './pages/homepage/homepage.comp'
import ShopPage from './pages/shop/shop.comp.jsx'
import CheckoutPage from './pages//checkout/checkout.comp.jsx'
import Auth from './pages/auth/auth.comp'
import Header from './components/layout/header/header.comp'

import {
    auth,
    createUserProfileDocument,
} from './firebase/firebase.utils'

import { setLoggedUser } from './redux/user/user.actions'
import { selectLoggedUser } from './redux/user/user.selectors'

// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'

import './App.css'

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
                <Route exact path='/' component={Homepage} />
                <Route path='/shop' component={ShopPage} />
                <Route exact path='/checkout' component={CheckoutPage} />
                <Route
                    exact
                    path='/signin'
                    render={() => (loggeduser ? <Redirect to='/' /> : <Auth />)}
                />
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
