import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Checkbox from './Checkbox'
import axios from 'axios'
import './Customization.css'
import Radio from './Radio'
import { toast } from 'react-toastify'

const Customization = (props) => {
    const [itemData, setItemData] = useState(null)
    //     id: props.modalInfo.id,
    //     name: props.modalInfo.name,
    //     size: [
    //         {
    //             id: 1,
    //             name: 'regular',
    //             price: 50,
    //             purchased: true,
    //             addons: [
    //                 {
    //                     id: 1,
    //                     name: 'extra cheese',
    //                     price: 20,
    //                     purchased: false
    //                 }
    //             ]
    //         },
    //         {
    //             id: 2,
    //             name: "jumbo",
    //             price: 80,
    //             purchased: false,
    //             addons: [
    //                 {
    //                     id: 2,
    //                     name: 'extra cheese',
    //                     price: 30,
    //                     purchased: false
    //                 },
    //                 {
    //                     id: 3,
    //                     name: 'wheat bread',
    //                     price: 10,
    //                     purchased: false
    //                 }
    //             ]
    //         }
    //     ]
    // })

    const [itemAddOns, setItemAddOns] = useState(null)
    //     {
    //         id: 1,
    //         name: 'extra cheese',
    //         price: 20,
    //         purchased: false
    //     }
    // ])

    const [selectedItem, setSelectedItem] = useState({
        id: props.modalInfo.id,
        category: props.modalInfo.category,
        name: props.modalInfo.name,
        size: {
            // id: 1,
            //     name: 'regular',
            //     price: 50,
            //     purchased: true,
        },
        addons: [],
        totalPrice: 0
    })

    useEffect(() => {
        const arrayAddonsAPI = (data) => {
            const arrayAddonsApi = data.map(element => {
                const addonsAPI = `http://4f28bfb829e6.ngrok.io/api/get_addons/${element.id}`
                return axios.get(addonsAPI)
            })
            return arrayAddonsApi
        }
        
        const fetchData = () => {
            let itemDataTemp = null
    
            const sizeAPI = `http://4f28bfb829e6.ngrok.io/api/get_sizes/${props.modalInfo.id}`
    
            axios.get(sizeAPI).then(response => {
                itemDataTemp = response.data.data
                const addonApiArray = arrayAddonsAPI(response.data.data.size)
                axios.all(addonApiArray).then(response1 => {
                    itemDataTemp.size.map((element, index) => {
                        element.purchased = true
                        element.addons = response1[index].data.data[0].addons
                        element.addons.forEach(el => {
                            el.purchased = false
                        });
                        if (index === 0) {
                            let elementAddonsTemp = [...element.addons]
                            let selectedItemTemp = { ...selectedItem }
                            selectedItemTemp.size = {...element}
                            selectedItemTemp.size.purchased = true
                            selectedItemTemp.totalPrice = element.price
                            delete selectedItemTemp.size.addons
                            setItemAddOns(elementAddonsTemp)
                            setSelectedItem(selectedItemTemp)
                        }
                        return null
                    })
                    setItemData(itemDataTemp)
                })
            }).catch(error => {
                toast.error('Could not connect to server. Please try again later.')
                props.itemCancelHandler();
            })
        }
        fetchData();
    }, [])

    const sizeHandler = (event, selected) => {
        let itemSelected = { ...selected }
        itemSelected.addons.forEach(el => el.purchased = false)
        setItemAddOns(itemSelected.addons)

        let selectedItemTemp = { ...selectedItem }
        selectedItemTemp.size = Object.assign({}, itemSelected)
        selectedItemTemp.size['purchased'] = true
        delete selectedItemTemp.size.addons
        selectedItemTemp.addons = []
        selectedItemTemp.totalPrice = itemSelected.price
        setSelectedItem(selectedItemTemp)
    }

    const addOnHandler = (event, selected) => {
        let itemAddOnsTemp = [...itemAddOns]
        let selectedItemTemp = { ...selectedItem }

        itemAddOnsTemp.map((e) => {
            if (selected.id === e.id) {
                e.purchased = !e.purchased
            }
            return null
        })
        setItemAddOns(itemAddOnsTemp)

        selectedItemTemp.addons = []
        selectedItemTemp.totalPrice = selectedItemTemp.size.price
        itemAddOnsTemp.map((e) => {
            if (e.purchased === true) {
                selectedItemTemp.addons.push(e)
                selectedItemTemp.totalPrice = selectedItemTemp.totalPrice + e.price
            }
            return null
        })
        setSelectedItem(selectedItemTemp)
    }

    const chooseSize = () => {
        return itemData.size.map((item) => {
            return <Radio item={item} onChange={sizeHandler} key={itemData.id + '_size_' + item.name}
                defaultChecked={selectedItem.size !== null ? selectedItem.size.name : null} />
        })
    }
    const chooseAddons = () => {
        return itemAddOns.map((item) => {
            return <Checkbox item={item} onChange={addOnHandler} key={itemData.id + '_addon_' + item.name} />
        })
    }

    return (
        <div>
            <Modal
                show={props.customizing}
                onHide={props.handleClose}
                autoFocus={true}
                enforceFocus={true}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className='uppercase'>{props.modalInfo.name}</h4>
                        <p className='category'>in {props.modalInfo.category}</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {((itemData !== null) && (itemAddOns !== null))
                        ? <><h5>Choose your size</h5>{chooseSize()}
                            <h5 className='mt-3'>Add Ons</h5>{chooseAddons()}
                        </>
                        : <p>loading...</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <h5 className='price' style={{ margin: 0, padding: 0, fontSize: '22px' }}><span className='rupee'>₹ </span>{selectedItem.totalPrice}</h5>
                    {/* <Button variant="secondary" onClick={props.handleClose}>Close</Button> */}
                    <Button variant="primary"
                        disabled={((itemData !== null) && (itemAddOns !== null)) ? false : true}
                        onClick={() => { props.addToCartBtn(selectedItem) }}>
                        Add To Cart
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Customization
