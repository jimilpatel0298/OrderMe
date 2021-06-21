import React, { useEffect, useState } from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Auxiliary from './hoc/Auxiliary'
import App from './App'
import Manage from './Manage'
import Auth from './containers/Auth/Auth'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Start = () => {
    let url = window.location.host
    axios.defaults.baseURL = 'http://' + url + '/api/'
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [pinInput, setPinInput] = useState('')
    
    const inputHandler = (event) => {
        let value = event.target.value
        setPinInput(value)
    }
    
    const checkPin = () => {
        console.log('inside check pin')
        axios.post('pin', {"pin": pinInput}).then(response => {
            let data = response.data.pin
            console.log('inside response', data)
            if (data === true) {
                setIsAuthenticated(true)
            } else {
                toast.error('WRONG PIN!!')
            }
            return data
        }).catch(error => {
            toast.error('Could not connect to server. Please try again!')
        })
    }
    
    const pinSubmit = (event) => {
        event.preventDefault()
        console.log('inside pin submit')
        checkPin()
    }

    let component = () => {
        if(isAuthenticated === true) {
            return <Manage />
        } else {
            return <Auth pinSubmit={pinSubmit} inputHandler={inputHandler} pin={pinInput}/>
        }
    }

    return (
        <Auxiliary>
            <BrowserRouter>
            <Container>
        <ToastContainer
          position="top-center"
          transition={Bounce}
          autoClose={1500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          closeButton={false}
          pauseOnHover={false}
        />
        </Container>
                <Switch>
                    <Route path='/manage' exact>
                        {component()}
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
