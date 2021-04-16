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
            //         id: 14,
            //         status: 'paid',
            //         paid: 160.0,
            //         total: 160.0,
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
            //         id: 14,
            //         status: 'prepared',
            //         paid: 160.0,
            //         total: 160.0,
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
        ],
        confirmation: false
    }

    paidHandler = (event, props) => {
        console.log('paid', event, props)
    }
    cancelHandler = () => {
        console.log('cancel')
    }
    dispatchedHandler = () => {
        console.log('dispatch')
    }

    messages = {
        paid: {
            title: 'Paid',
            body: 'Are you sure you want to confirm as the order paid?',
            button: this.paidHandler
        },
        cancel: {
            title: 'Cancel',
            body: "Are you sure you want to cancel the order?",
            button: this.cancelHandler
        },
        dispatched: {
            title: 'Dispatched',
            body: "Are you sure you want to make the order dispatched?",
            button: this.dispatchedHandler
        }
    }

    modalInfo = {};

    confirmationClose = () => this.setState({ confirmation: false })
    confirmationShow = () => this.setState({ confirmation: true })

    statusHandler = (event, order) => {
        console.log(order)
        const button = event.target.id
        this.modalInfo = this.messages[button]
        this.confirmationShow();
    }

    displayOrders = () => {
        // display category block and items inside 
        const menu_items = this.state.orders.map(iteration => {
            return <OrderCard statusHandler={this.statusHandler} order={iteration} key={iteration.order.id} />
        });

        return menu_items
    }

    orderData = (response, single=false) => {
        let ordersTemp = [...this.state.orders]
        
        if(single === true) {
            let newOrder = {...response}
            console.log(response)
            ordersTemp.unshift(newOrder)

        }else {
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
                    total: elementOrder.order[0].total
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
    }

    fetchOrder = () => {
        // axios.get('http://localhost:8000/api/get_order_details').then(response => {
        //     if (response.data.data.length !== 0) {
        //         this.orderData(response.data.data);
        //     }
        // }).catch(error => {
        //     toast.error('Could not connect to server. Please try again later.')
        // })

        let source = new EventSource("http://localhost:8000/api/get_latest_order");
        source.onmessage = e => {
            console.log('inside message')
            this.orderData(JSON.parse(e.data), true)
        }
        source.onerror = e => {
            console.log('inside error')
        }

    }

    componentDidMount = () => {
        this.fetchOrder()
    }

    render() {
        return (
            <Auxiliary>
                <Header />
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
                />
                <main className='py-3'>
                    <Container>
                        <div id='headerBar'>
                            <Row>
                                <Col>Orders: <span className="bold">{this.state.orders.length}</span></Col>
                                <Col style={{ textAlign: 'right' }}>Filter</Col>
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
