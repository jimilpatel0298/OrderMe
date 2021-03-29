import React, { Component } from "react";
import Auxiliary from '../../hoc/Auxiliary'
import Category from '../../components/MenuItem/Category'
import Customization from '../../components/Modal/Customization/Customization'

class Menu extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }

    state = {
        menuItems: [
            {
                category: 'sandwiches',
                items: [
                    {
                        id: 1,
                        name: 'Cheese Sandwich',
                        image: null,
                        description: 'Cheese blend with mayo',
                        price: 100
                    },
                    {
                        id: 2,
                        name: 'Tandoori Panner',
                        image: null,
                        description: 'Panner blend with tandoori sauce',
                        price: 150
                    }
                ]
            },
            {
                category: 'bread pizzas',
                items: [
                    {
                        id: 3,
                        name: 'Say Cheese!',
                        image: null,
                        description: 'Just Cheese Pizza',
                        price: 59
                    },
                    {
                        id: 4,
                        name: 'Cheesy Veg',
                        image: null,
                        description: 'Just Cheese Pizza',
                        price: 79
                    },
                    {
                        id: 5,
                        name: 'Paneer Cheese!',
                        image: null,
                        description: 'Just Cheese Pizza',
                        price: 59
                    },
                    {
                        id: 6,
                        name: 'Veg',
                        image: null,
                        description: 'Just Cheese Pizza',
                        price: 79
                    }
                ]
            }
        ],
        customization: false,
        cart: []

    }

    modalInfo = null;

    itemAddHandler = (item, category) => {
        this.setState({ customization: true })
        this.modalInfo = item
        console.log(category)
        console.log(this.modalInfo)
        this.modalInfo['category'] = category
        console.log(this.modalInfo)
    }

    itemCancelHandler = () => {
        this.setState({ customization: false })
    }

    displayMenu = () => {
        // display category block and items inside 
        const menu_items = this.state.menuItems.map(iteration => {
            return <Category title={iteration.category} items={iteration.items} key={iteration.category} onAdd={this.itemAddHandler} />
        });

        return menu_items
    }

    addToCart = (orderedObject) => {
        const orderedObjectCopied = {...orderedObject}
        console.log(orderedObjectCopied)
        let cartTemp = [...this.state.cart]
        console.log(cartTemp)
        cartTemp.push(orderedObjectCopied)
        console.log(cartTemp)
        this.setState({cart: cartTemp})
        this.setState({ customization: false })
    }

    render() {
        return (
            <Auxiliary>
                {
                    (this.state.menuItems != null) ? this.displayMenu() : <h4 className='text-center'>No items to display. <br />Please check back later.</h4>
                }
                {
                    this.state.customization ? <Customization
                    customizing={this.state.customization}
                    handleClose={this.itemCancelHandler}
                    modalInfo={this.modalInfo} addToCarBtn={this.addToCart}/> : null
                }
            </Auxiliary>
        );
    }
}

export default Menu;