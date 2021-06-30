import React, { Component } from "react";
import Auxiliary from '../../hoc/Auxiliary'
import Category from '../../components/MenuItem/Category'
import Customization from '../../components/Modal/Customization/Customization'
import axios from 'axios'
import { toast } from 'react-toastify'
import Header from '../../components/Header/Header'
import {Container} from 'react-bootstrap'


class Menu extends Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {
        menuItems: [
            // {
            //     type: 'sandwiches',
            //     products: [
            //         {
            //             id: 1,
            //             name: 'Spicy Paneer Schezwan',
            //             image: null,
            //             description: 'Cheese blend with mayo',
            //             price: 100,
            //         },
            //         {
            //             id: 2,
            //             name: 'Tandoori Panner',
            //             image: null,
            //             description: 'Panner blend with tandoori sauce',
            //             price: 150
            //         }
            //     ]
            // },
            // {
            //     type: 'bread pizzas',
            //     products: [
            //         {
            //             id: 3,
            //             name: 'Say Cheese!',
            //             image: null,
            //             description: 'Just Cheese Pizza',
            //             price: 59
            //         },
            //         {
            //             id: 4,
            //             name: 'Cheesy Veg',
            //             image: null,
            //             description: 'Just Cheese Pizza',
            //             price: 79
            //         },
            //         {
            //             id: 5,
            //             name: 'Paneer Cheese!',
            //             image: null,
            //             description: 'Just Cheese Pizza',
            //             price: 59
            //         },
            //         {
            //             id: 6,
            //             name: 'Veg',
            //             image: null,
            //             description: 'Just Cheese Pizza',
            //             price: 79
            //         }
            //     ]
            // }
        ],
        customization: false,
        cart: []

    }

    componentDidMount() {
        axios.get('menu')
        .then(response => {
            let stateTemp = {...this.state}
            stateTemp.menuItems = response.data.data.menuItems
            this.setState(stateTemp)
        }).catch(error => {
            toast.error('Could not connect to server. Please try again!')
        })
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        // let scale = 'scale(1)';
        // document.body.style.webkitTransform =  scale;
    }

    modalInfo = null;

    itemAddHandler = (item, category) => {
        this.setState({ customization: true })
        this.modalInfo = {...item}
        this.modalInfo['category'] = category
    }

    itemCancelHandler = () => {
        this.setState({ customization: false })
    }

    displayMenu = () => {
        // display category block and items inside 
        const menu_items = this.state.menuItems.map(iteration => {
            return <Category title={iteration.type} items={iteration.products} key={iteration.type} onAdd={this.itemAddHandler} />
        });

        return menu_items
    }

    menuClicked = (id=null) => {
        console.log('clicked')
        if (id != null) {
            const section = document.querySelector( '#' + id );
            section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
        }
    }

    render() {
        return (
            <Auxiliary>
            <Header title='menu' menuClicked={this.menuClicked} menuItems={this.state.menuItems}/>
            <Container as='div' style={{maxWidth: '540px'}}>
                {
                    (this.state.menuItems.length !==0 ) ? this.displayMenu() : <h5 className='text-center' style={{ fontStyle: 'italic'}}>Loading... Please wait!</h5>
                }
                {
                    this.state.customization ? <Customization
                        customizing={this.state.customization}
                        handleClose={this.itemCancelHandler}
                        modalInfo={this.modalInfo} addToCartBtn={(orderedObject) => {
                            this.setState({ customization: false })
                            this.props.addToCart({...orderedObject})
                        }}
                        itemCancelHandler={this.itemCancelHandler} /> : null
                }
                </Container>
            </Auxiliary>
        );
    }
}

export default Menu;