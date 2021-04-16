import React, { useState } from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Auxiliary from './hoc/Auxiliary'
import App from './App'
import Manage from './Manage'
import Auth from './containers/Auth/Auth'
import axios from 'axios'

const Start = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const pinSubmit = (event, pin) => {
        event.preventDefault()
        if(pin === '2021') {
            setIsAuthenticated(true)
        }
    }

    axios.defaults.baseURL = 'http://localhost:8000/api/';

    return (
        <Auxiliary>
            <BrowserRouter>
                <Switch>
                    <Route path='/manage' exact>
                        {isAuthenticated ? <Manage />: <Auth pinSubmit={pinSubmit}/>}
                    </Route>
                    <Route path='/'>
                        <App />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Auxiliary>
    )
}

export default Start
