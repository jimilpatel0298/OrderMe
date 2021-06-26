import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import Alert from '../../components/Alert/Alert'

const Auth = (props) => {
    return (
        <div style={{ margin: 'auto', marginTop: '10vh', width: '300px' }}>
            <Alert variant='info' title='Enter PIN'>
                <Form onSubmit={(event) => props.pinSubmit(event) }>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Password" value={props.pin} onChange={props.inputHandler} style={{borderRadius: '70px'}} autoFocus/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{width: '100%', borderRadius: '70px'}} onClick={(event)=>{
                        props.pinSubmit(event);
                    }}>
                        Submit
                    </Button>
                </Form>
            </Alert>
        </div>
    )
}

export default Auth
