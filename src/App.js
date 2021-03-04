import React, { useState, useEffect } from 'react'
import Homepage from './pages/homepage/homepage.comp'
import ShopPage from './pages/shop/shop.comp.jsx'
import Auth from './pages/auth/auth.comp'
import Header from './components/layout/header/header.comp'
import { Switch, Route } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

import './App.css'

const App = () => {
    const [loggeduser, setloggedUser] = useState(null)

    let unsubscribeFromAuth = null

    useEffect(() => {
        unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)

                userRef.onSnapshot((snapShot) => {
                    setloggedUser({
                        id: snapShot.id,
                        ...snapShot.data(),
                    })

                    console.log(loggeduser)
                })
            } else {
                // If the user sign out, set state to null
                setloggedUser(userAuth)
            }
        })

        return () => {
            unsubscribeFromAuth()
        }
    }, [])

    return (
        <>
            <Header loggeduser={loggeduser} />
            <Switch>
                <Route exact path='/' component={Homepage} />
                <Route path='/shop' component={ShopPage} />
                <Route path='/signin' component={Auth} />
            </Switch>
        </>
    )
}

export default App
