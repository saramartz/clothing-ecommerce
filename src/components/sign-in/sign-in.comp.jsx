import React, { useState } from 'react'
import CustomButton from '../custom-button/custom-button.comp'
import FormGroup from '../form-group/form-group.comp'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import './sign-in.styles.scss'

const SignIn = () => {
    const [signin, setSignIn] = useState({
        email: '',
        password: '',
    })

    const { email, password } = signin

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await auth.signInWithEmailAndPassword(email, password)
            setSignIn({
                email: '',
                password: '',
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const { value, name } = e.target

        setSignIn({
            ...signin,
            [name]: value,
        })
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormGroup
                    name='email'
                    type='email'
                    handleChange={handleChange}
                    value={email}
                    label='email'
                    required
                />
                <FormGroup
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label='password'
                    required
                />
                <div className='buttons'>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn
