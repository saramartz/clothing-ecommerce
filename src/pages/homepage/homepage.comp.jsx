import React, { Profiler } from 'react'
import Directory from '../../components/directory/directory.comp'
import './homepage.styles.scss'

const Homepage = () => {
    return (
        <div className='homepage'>
            <Profiler
                id='directory'
                onRender={(id, phase, actualDuration) => {
                    console.log({ id, phase, actualDuration })
                }}
            >
                <Directory />
            </Profiler>
        </div>
    )
}

export default Homepage
