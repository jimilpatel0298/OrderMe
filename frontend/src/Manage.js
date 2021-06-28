import React, { Component } from 'react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Auxiliary from './hoc/Auxiliary'
import { Col, Container, Row } from 'react-bootstrap'
import OrderCard from './components/Manage/OrderCard/OrderCard'
import './manage.css'
import Confirmation from './components/Modal/Confirmation/Confirmation'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import {Howl, Howler} from 'howler';
import notifySound from './sounds/notification.mp3';


class Manage extends Component {
    state = {
        orders: [
            // {
            //     contactDetails: {
            //         id: 12,
            //         name: 'Jimil Patel',
            //         phone: "7567438095"
            //     },
            //     order: {
            //         id: 14,
            //         status: 'tobepaid',
            //         paid: 160.0,
            //         total: 160.0,
            //         paidStatus: false
            //     },
            //     orderItems: [
            //         {
            //             id: 8,
            //             name: "Farm Fresh",
            //             category: 'bread pizza',
            //             product: 1,
            //             order: 14,
            //             total: 160.0,
            //             itemSize: {
            //                 id: 2,
            //                 name: 'jumbo',
            //                 price: 150.0
            //             },
            //             itemAddons: [
            //                 {
            //                     id: 6,
            //                     addon: 1,
            //                     name: "extra toppings",
            //                     price: 10.0
            //                 }
            //             ]
            //         },
            //         {
            //             id: 9,
            //             name: "Farm Fresh",
            //             category: 'bread pizza',
            //             product: 1,
            //             order: 14,
            //             total: 160.0,
            //             itemSize: {
            //                 id: 2,
            //                 name: 'jumbo',
            //                 price: 150.0
            //             },
            //             itemAddons: [
            //                 {
            //                     id: 6,
            //                     addon: 1,
            //                     name: "extra toppings",
            //                     price: 10.0
            //                 }
            //             ]
            //         },
            //     ]
            // },
            // {
            //     contactDetails: {
            //         id: 12,
            //         name: 'Jimil Patel',
            //         phone: "7567438095"
            //     },
            //     order: {
            //         id: 15,
            //         status: 'paid',
            //         paid: 160.0,
            //         total: 160.0,
            //         paidStatus: true
            //     },
            //     orderItems: [
            //         {
            //             id: 8,
            //             name: "Farm Fresh",
            //             category: 'bread pizza',
            //             product: 1,
            //             order: 14,
            //             total: 160.0,
            //             itemSize: {
            //                 id: 2,
            //                 name: 'jumbo',
            //                 price: 150.0
            //             },
            //             itemAddons: [
            //                 {
            //                     id: 6,
            //                     addon: 1,
            //                     name: "extra toppings",
            //                     price: 10.0
            //                 }
            //             ]
            //         },
            //         {
            //             id: 9,
            //             name: "Farm Fresh",
            //             category: 'bread pizza',
            //             product: 1,
            //             order: 14,
            //             total: 160.0,
            //             itemSize: {
            //                 id: 2,
            //                 name: 'jumbo',
            //                 price: 150.0
            //             },
            //             itemAddons: [
            //                 {
            //                     id: 6,
            //                     addon: 1,
            //                     name: "extra toppings",
            //                     price: 10.0
            //                 }
            //             ]
            //         },
            //     ]
            // },
            // {
            //     contactDetails: {
            //         id: 12,
            //         name: 'Anshul Kotadia',
            //         phone: "7567438095"
            //     },
            //     order: {
            //         id: 16,
            //         status: 'paylater',
            //         paid: 160.0,
            //         total: 160.0,
            //         paidStatus: false
            //     },
            //     orderItems: [
            //         {
            //             id: 8,
            //             name: "Farm Fresh",
            //             category: 'bread pizza',
            //             product: 1,
            //             order: 14,
            //             total: 160.0,
            //             itemSize: {
            //                 id: 2,
            //                 name: 'jumbo',
            //                 price: 150.0
            //             },
            //             itemAddons: [
            //                 {
            //                     id: 6,
            //                     addon: 1,
            //                     name: "extra toppings",
            //                     price: 10.0
            //                 }
            //             ]
            //         },
            //         {
            //             id: 9,
            //             name: "Farm Fresh",
            //             category: 'bread pizza',
            //             product: 1,
            //             order: 14,
            //             total: 160.0,
            //             itemSize: {
            //                 id: 2,
            //                 name: 'jumbo',
            //                 price: 150.0
            //             },
            //             itemAddons: [
            //                 {
            //                     id: 6,
            //                     addon: 1,
            //                     name: "extra toppings",
            //                     price: 10.0
            //                 }
            //             ]
            //         },
            //     ]
            // },
            // {
            //     contactDetails: {
            //         id: 12,
            //         name: 'Jimil Patel',
            //         phone: "7567438095"
            //     },
            //     order: {
            //         id: 17,
            //         status: 'prepared',
            //         paid: 160.0,
            //         total: 160.0,
            //         paidStatus: true
            //     },
            //     orderItems: [
            //         {
            //             id: 8,
            //             name: "Farm Fresh",
            //             category: 'bread pizza',
            //             product: 1,
            //             order: 14,
            //             total: 160.0,
            //             itemSize: {
            //                 id: 2,
            //                 name: 'jumbo',
            //                 price: 150.0
            //             },
            //             itemAddons: [
            //                 {
            //                     id: 6,
            //                     addon: 1,
            //                     name: "extra toppings",
            //                     price: 10.0
            //                 }
            //             ]
            //         },
            //         {
            //             id: 9,
            //             name: "Farm Fresh",
            //             category: 'bread pizza',
            //             product: 1,
            //             order: 14,
            //             total: 160.0,
            //             itemSize: {
            //                 id: 2,
            //                 name: 'jumbo',
            //                 price: 150.0
            //             },
            //             itemAddons: [
            //                 {
            //                     id: 6,
            //                     addon: 1,
            //                     name: "extra toppings",
            //                     price: 10.0
            //                 }
            //             ]
            //         },
            //         {
            //             id: 9,
            //             name: "Farm Fresh",
            //             category: 'bread pizza',
            //             product: 1,
            //             order: 14,
            //             total: 160.0,
            //             itemSize: {
            //                 id: 2,
            //                 name: 'jumbo',
            //                 price: 150.0
            //             },
            //             itemAddons: [
            //                 {
            //                     id: 6,
            //                     addon: 1,
            //                     name: "extra toppings",
            //                     price: 10.0
            //                 }
            //             ]
            //         },
            //         {
            //             id: 9,
            //             name: "Farm Fresh",
            //             category: 'bread pizza',
            //             product: 1,
            //             order: 14,
            //             total: 160.0,
            //             itemSize: {
            //                 id: 2,
            //                 name: 'jumbo',
            //                 price: 150.0
            //             },
            //             itemAddons: [
            //                 {
            //                     id: 6,
            //                     addon: 1,
            //                     name: "extra toppings",
            //                     price: 10.0
            //                 }
            //             ]
            //         },
            //     ]
            // },
        ],
        confirmation: false,
        soundLoop: false,
        day: null
    }

    sound = new Howl({
        src: notifySound,
        loop: true,
    });

    soundPlay = () => {

        this.sound.play();
        Howler.volume(1.0);
    }

    soundStop = () => {
        this.sound.stop();
    }

    preparedHandler = (event, orderTemp1) => {
        let ordersTemp = [...this.state.orders]
        const elementIndex = this.state.orders.findIndex(element => element.order.id === orderTemp1.data.order.id)
        ordersTemp[elementIndex].order.status = orderTemp1.messages.title.toLowerCase()
        this.setState({ orders: ordersTemp, confirmation: false })
    }

    confirmHandler = (event, orderTemp) => {
        let ordersTemp = [...this.state.orders]
        const elementIndex = this.state.orders.findIndex(element => element.order.id === orderTemp.data.order.id)
        ordersTemp[elementIndex].order.status = orderTemp.messages.title.toLowerCase()
        
        if(orderTemp.paidBtn === true) {
            ordersTemp[elementIndex].order.paidStatus = true
        }
        
        axios.put(`update_status/${orderTemp.data.order.id}`, {status: orderTemp.messages.title.toLowerCase()})
        .then(response => {
            console.log(response)
            if(response.data.order.status === 'cancelled' || response.data.order.status === 'dispatched') {
                ordersTemp.splice(elementIndex, 1)
                this.setState({ orders: ordersTemp, confirmation: false })
            } else {
                this.setState({ orders: ordersTemp, confirmation: false })
            }
            toast.success('Changes pushed to server.')
        }).catch(error => {
            console.log(error)
            toast.error('Could not connect to server. Please try again later.')
        })
    }

    messages = {
        paid: {
            title: 'Paid',
            body: 'Are you sure you want to confirm as the order paid?',
            button: this.confirmHandler

        },
        payLater: {
            title: 'Paylater',
            body: 'Are you sure you want to confirm the order as pay later?',
            button: this.confirmHandler
        },
        cancel: {
            title: 'Cancelled',
            body: "Are you sure you want to cancel the order?",
            button: this.confirmHandler

        },
        dispatched: {
            title: 'Dispatched',
            body: "Are you sure you want to make the order dispatched?",
            button: this.confirmHandler

        },
        prepared: {
            title: 'Prepared',
            body: 'Are you sure you want to make the order prepared?',
            button: this.confirmHandler
        }
    }

    modalInfo = {};

    confirmationClose = () => this.setState({ confirmation: false })
    confirmationShow = () => this.setState({ confirmation: true })

    statusHandler = (event, order, paidbtn) => {
        console.log(order)
        const button = event.target.id
        this.modalInfo.messages = this.messages[button]
        this.modalInfo.data = order
        this.modalInfo.paidBtn = paidbtn
        console.log(this.modalInfo)
        this.confirmationShow();
    }

    displayOrders = () => {
        // display category block and items inside 
        const menu_items = this.state.orders.map(iteration => {
            return <OrderCard statusHandler={this.statusHandler} order={iteration} key={iteration.order.id + iteration.contactDetails.id} soundStop={this.soundStop} day={this.state.day}/>
        });

        return menu_items
    }

    orderData = (response, single = false) => {
        let ordersTemp = [...this.state.orders]

        if (single === true) {
            console.log('inside if of single true')
            let newOrder = { ...response }
            if (ordersTemp.some(element => element.order.id === newOrder.order.id)) {
                console.log('exists order already')
                return false
            } else if (newOrder.order.status === 'cancelled' && newOrder.order.status === 'dispatched') {
                console.log('cancelled or dispatched')
                return false
            } else {
                console.log('inside else unshift')
                ordersTemp.unshift(newOrder)
            }
        } else {
            let serverOrder = response
            serverOrder.forEach(elementOrder => {
                let newOrder = {
                    contactDetails: {
                        id: elementOrder.id,
                        name: elementOrder.name,
                        phone: elementOrder.phone
                    },
                    order: {
                        id: elementOrder.order[0].id,
                        status: elementOrder.order[0].status,
                        paid: elementOrder.order[0].paid,
                        total: elementOrder.order[0].total,
                        paidStatus: elementOrder.order[0].paid_status
                    },
                    orderItems: elementOrder.order[0].orderitems.map(elementOrderItem => {
                        let orderItemTemp = {
                            id: elementOrderItem.id,
                            category: elementOrderItem.category,
                            name: elementOrderItem.name,
                            product: elementOrderItem.product,
                            total: elementOrderItem.total,
                            itemSize: {
                                id: elementOrderItem.size_id,
                                name: elementOrderItem.size_name,
                                price: elementOrderItem.price
                            },
                            itemAddons: elementOrderItem.item_addons.map(elementOrderItemAddon => {
                                let orderAddonTemp = {
                                    id: elementOrderItemAddon.id,
                                    addon: elementOrderItemAddon.addon,
                                    name: elementOrderItemAddon.name,
                                    price: elementOrderItemAddon.price
                                }
                                return orderAddonTemp
                            })
                        }
                        return orderItemTemp
                    })

                }
                ordersTemp.unshift(newOrder)
            });
        }
        this.setState({ orders: ordersTemp })
        return true
    }

    landed = false;

    fetchOrder = () => {
        axios.get('get_order_details').then(response => {
            if (response.data.data.length !== 0) {
                this.orderData(response.data.data);
            }
        }).catch(error => {
            console.log('fetch order error', error)
            toast.error('Could not connect to server. Please try again later.')
        })

        let source = new EventSource(`http://${window.location.host}/api/get_latest_order`);
        // let source = new EventSource(`http://127.0.0.1:8000/api/get_latest_order`);
        source.onmessage = e => {
            console.log(e)
            var data = JSON.parse(e.data)
            if (data === -1) {
                window.location.reload()
                //(this.landed === true && 
            } else if (this.landed === true && data !== -1) {
                const order_added = this.orderData(data, true)
                console.log('Order Added', order_added)
                if (order_added) {
                    console.log('play sound if')
                    toast.info('NEW ORDER # ' + data.order.id)
                    this.soundPlay()
                }
            }
            if (this.landed === false) {
                toast.success('Connection Established')
            }
            this.landed = true;
        }
        source.onerror = e => {
            console.log('event source error', e)
            toast.error('Could not connect to server. Please try again later.')
            window.location.reload()
        }

    }

    closeManage = () => {
        axios.post('close', {manage_toggle: true}).then(response => {
            window.location.reload()
        }).catch(error => {
          toast.error('Could not connect to server. Please try again!')
        })
    }

    componentDidMount = () => {
        this.landed = false
        axios.get('day')
        .then(response => {
            let day = response.data.day
            console.log(day)
            this.setState({day: day})
        }).catch(error => {
          console.log(error)
          // toast.error('Could not connect to server. Please try again!')
        })
        this.fetchOrder()

        // window.addEventListener("beforeunload", (ev) => 
        // {  
        //     ev.preventDefault();
        //     alert('are you sure?')
            // return ev.returnValue = 'Are you sure you want to close?';
        // });
    }

    render() {
        return (
            <Auxiliary>
                <Header title='manage' closeManage={this.closeManage}/>
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
                    pauseOnHover={false}
                    closeButton={false}
                />
                <main className='py-3 app-body'>
                    <Container>
                        <div id='headerBar'>
                            <Row>
                                <Col><h4 style={{fontWeight: '400'}}>Orders: <span className="bold">{this.state.orders.length}</span></h4></Col>
                                <Col style={{ textAlign: 'right' }}><h4>Filter</h4></Col>
                            </Row>
                        </div>
                        <div id='orders'>
                            {
                                (this.state.orders.length !== 0) ? this.displayOrders() : <h4 className='text-center'>No orders to display.</h4>
                            }

                            {this.state.confirmation ? <Confirmation
                                show={this.state.confirmation}
                                handleShow={this.confirmationShow}
                                handleClose={this.confirmationClose}
                                modalInfo={this.modalInfo} /> : null}

                        </div>
                    </Container>
                </main>
                <Footer />
            </Auxiliary>
        )
    }
}

export default Manage
