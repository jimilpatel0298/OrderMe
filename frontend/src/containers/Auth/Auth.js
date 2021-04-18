import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import Alert from '../../components/Alert/Alert'

const Auth = (props) => {

    const [pinInput, setPinInput] = useState('')

    const inputHandler = (event) => {
        let value = event.target.value
        setPinInput(value)
    }

    return (
        <div style={{ margin: 'auto', marginTop: '10vh', width: '300px' }}>
            <Alert variant='info' title='Enter PIN'>
                <Form onSubmit={(event) => props.pinSubmit(event, pinInput) }>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Password" value={pinInput} onChange={inputHandler}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" as='div' style={{width: '100%'}} onClick={(event)=>{
                        props.pinSubmit(event, pinInput);
                    }}>
                        Submit
                    </Button>
                </Form>
            </Alert>
        </div>
    )
}

export default Auth
