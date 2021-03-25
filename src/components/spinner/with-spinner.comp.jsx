import React from 'react'
import Spinner from './spinner.comp'

const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />
}

export default WithSpinner
