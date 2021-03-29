import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Checkbox from './Checkbox'

import './Customization.css'
import Radio from './Radio'

const Customization = (props) => {
    const [itemData] = useState({
        id: 1,
        size: [
            {
                name: 'regular',
                price: 50,
                purchased: false
            },
            {
                name: 'jumbo',
                price: 80,
                purchased: false
            }
        ],
        addonsRegular: [
            {
                name: 'extra cheese',
                price: 15,
                purchased: false
            },
            {
                name: 'wheat bread',
                price: 10,
                purchased: false
            }
        ],
        addonsJumbo: [
            {
                name: 'extra cheese',
                price: 20,
                purchased: false
            },
            {
                name: 'wheat bread',
                price: 15,
                purchased: false
            }
        ]
    })

    const [itemAddOns, setItemAddOns] = useState([
        {
            name: 'extra cheese',
            price: 15,
            purchased: false
        },
        {
            name: 'wheat bread',
            price: 10,
            purchased: false
        }
    ]
    )

    const [selectedItem, setSelectedItem] = useState({
        category: props.modalInfo.category,
        name: props.modalInfo.name,
        size: {
            name: 'regular',
            price: 50,
            purchased: true
        },
        addons: [],
        totalPrice: 50
    })

    function clicked() {
        console.log('...function to add variants')
    }

    const sizeHandler = (event, selected) => {
        const value = event.target.value
        let itemSelected = { ...selected }

        if (value === 'jumbo') {
            let addOnsJumbo = [...itemData.addonsJumbo];
            addOnsJumbo.forEach((e) => {
                e.purchased = false;
            })
            setItemAddOns(addOnsJumbo)
        }
        else if (value === 'regular') {
            let addOnsRegular = [...itemData.addonsRegular];
            addOnsRegular.forEach((e) => {
                e.purchased = false;
            })
            setItemAddOns(addOnsRegular)
        }

        let selectedItemTemp = { ...selectedItem }
        selectedItemTemp.size = itemSelected
        selectedItemTemp.size['purchased'] = true
        selectedItemTemp.addons = []
        selectedItemTemp.totalPrice = itemSelected.price
        setSelectedItem(selectedItemTemp)
    }

    const addOnHandler = (event) => {
        let itemAddOnsTemp = [...itemAddOns]
        itemAddOnsTemp.map((e) => {
            if (event.target.name === e.name) {
                e.purchased = !e.purchased
            }
            return {}
        })
        setItemAddOns(itemAddOnsTemp)

        let selectedItemTemp = { ...selectedItem }
        selectedItemTemp.addons = []
        selectedItemTemp.totalPrice = selectedItemTemp.size.price
        itemAddOnsTemp.map((e) => {
            if (e.purchased === true) {
                selectedItemTemp.addons.push(e)
                selectedItemTemp.totalPrice = selectedItemTemp.totalPrice + e.price
            }
            return {}
        })
        setSelectedItem(selectedItemTemp)
    }

    return (
        <div>
            <Modal
                show={props.customizing}
                onHide={props.handleClose}
                autoFocus={true}
                enforceFocus={true}
                onEntering={clicked}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className='uppercase'>{props.modalInfo.name}</h4>
                        <p className='category'>in {props.modalInfo.category}</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Choose your size</h5>
                    {itemData.size.map((item) => {
                        return <Radio item={item} onChange={sizeHandler} key={item.id + '_size_' + item.name}
                            defaultChecked={selectedItem.size.name} />
                    })}
                    <h5 className='mt-3'>Add Ons</h5>
                    {itemAddOns.map((item) => {
                        return <Checkbox item={item} onChange={addOnHandler} key={item.id + '_addon_' + item.name} />
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <h5 className='price' style={{ margin: 0, padding: 0, fontSize: '22px' }}><span className='rupee'>₹ </span>{selectedItem.totalPrice}</h5>
                    {/* <Button variant="secondary" onClick={props.handleClose}>Close</Button> */}
                    <Button variant="primary" onClick={() => { props.addToCarBtn(selectedItem) }}>Add To Cart</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Customization
